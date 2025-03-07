import jwt from "jsonwebtoken";
import { IUserRepository } from "@/domain/repositories/IUserRepository";
import { RefreshAccessTokenUseCase } from "./RefreshAccessTokenUseCase";
import { JwtPayload } from "jsonwebtoken";

export interface CustomJwtPayload extends JwtPayload {
  userId: string;
  loginId: string;
}

export interface GetUserInfoResult {
  user: { loginId: string; name: string };
  newTokenCookie?: string;
}

export class GetUserInfoUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(
    accessToken: string | undefined,
    refreshToken: string | undefined
  ): Promise<GetUserInfoResult> {
    if (!accessToken && !refreshToken) {
      throw new Error("Unauthorized");
    }

    let decoded: CustomJwtPayload | undefined = undefined;
    let newTokenCookie: string | undefined = undefined;

    // 1. Access Token 검증 시도
    if (accessToken) {
      try {
        decoded = jwt.verify(
          accessToken,
          process.env.JWT_SECRET as string
        ) as CustomJwtPayload;
      } catch (error) {
        // 액세스 토큰이 만료되거나 유효하지 않으면, refresh token 처리로 넘어감.
      }
    }

    // 2. Access Token이 없거나 유효하지 않으면 refreshToken으로 새 토큰 발급 시도
    if (!decoded && refreshToken) {
      const refreshAccessTokenUseCase = new RefreshAccessTokenUseCase(
        this.userRepository
      );
      const refreshResult = await refreshAccessTokenUseCase.execute(
        refreshToken
      );
      accessToken = refreshResult.accessToken;
      newTokenCookie = refreshResult.newTokenCookie;
      decoded = jwt.verify(
        accessToken,
        process.env.JWT_SECRET as string
      ) as CustomJwtPayload;
    }

    if (!decoded) {
      throw new Error("Invalid accessToken");
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
