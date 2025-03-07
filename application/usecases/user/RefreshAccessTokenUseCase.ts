import jwt from "jsonwebtoken";
import { IUserRepository } from "@/domain/repositories/IUserRepository";

export class RefreshAccessTokenUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(
    refreshToken: string
  ): Promise<{ accessToken: string; newTokenCookie: string }> {
    try {
      const refreshDecoded = jwt.verify(
        refreshToken,
        process.env.JWT_SECRET as string
      ) as jwt.JwtPayload;
      const loginId = refreshDecoded.loginId;
      if (!loginId) {
        throw new Error("Invalid refresh token payload");
      }

      // DB에서 사용자 조회하여 userId를 포함한 토큰 payload 구성
      const user = await this.userRepository.findByLoginId(loginId);
      if (!user) {
        throw new Error("User not found");
      }

      // access token 재발급 (payload에 loginId와 userId 추가, 유효시간 1시간)
      const newAccessToken = jwt.sign(
        { loginId: user.loginId, userId: user.userId },
        process.env.JWT_SECRET as string,
        { expiresIn: "1h" }
      );

      const newTokenCookie = `accessToken=${newAccessToken}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=3600`;

      return { accessToken: newAccessToken, newTokenCookie };
    } catch (error) {
      throw new Error("Refresh token expired.");
    }
  }
}
