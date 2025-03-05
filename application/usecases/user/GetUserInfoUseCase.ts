import jwt from "jsonwebtoken";
import { IUserRepository } from "@/domain/repositories/IUserRepository";

export interface GetUserInfoResult {
  user: { loginId: string; name: string };
  newTokenCookie?: string;
}

export class GetUserInfoUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(
    token: string | undefined,
    refreshToken: string | undefined
  ): Promise<GetUserInfoResult> {
    if (!token && !refreshToken) {
      throw new Error("Unauthorized");
    }

    let decoded: any;
    let newTokenCookie: string | undefined = undefined;

    // 1. Access Token 검증 시도
    if (token) {
      try {
        decoded = jwt.verify(token, process.env.JWT_SECRET as string);
      } catch (error) {
        // 액세스 토큰이 만료되거나 유효하지 않으면, refresh token 처리로 넘어감.
      }
    }

    // 2. Access Token이 없거나 유효하지 않으면 refreshToken으로 새 토큰 발급 시도
    if (!decoded && refreshToken) {
      try {
        const refreshDecoded = jwt.verify(
          refreshToken,
          process.env.JWT_SECRET as string
        );
        // refresh token의 loginId로 새 액세스 토큰 발급 (유효시간 1시간)
        token = jwt.sign(
          { loginId: (refreshDecoded as jwt.JwtPayload).loginId },
          process.env.JWT_SECRET as string,
          { expiresIn: "1h" }
        );
        newTokenCookie = `token=${token}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=3600`;
        decoded = jwt.verify(token, process.env.JWT_SECRET as string);
      } catch (error) {
        throw new Error("Refresh token expired.");
      }
    }

    if (!decoded) {
      throw new Error("Invalid token");
    }

    const loginId: string = decoded.loginId;

    // 3. DB에서 사용자 정보 조회
    const user = await this.userRepository.findByLoginId(loginId);
    if (!user) {
      throw new Error("User not found");
    }

    return {
      user: { loginId: user.loginId, name: user.name },
      newTokenCookie,
    };
  }
}
