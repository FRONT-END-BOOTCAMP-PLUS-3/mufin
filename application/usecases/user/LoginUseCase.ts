import { IUserRepository } from "@/domain/repositories/IUserRepository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface LoginRequest {
  loginId: string;
  password: string;
}

interface LoginResponse {
  token: string;
  refreshToken: string;
  user: {
    userId: string;
    loginId: string;
  };
}

export class LoginUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute({ loginId, password }: LoginRequest): Promise<LoginResponse> {
    // 사용자 조회 (loginId를 통해)
    const user = await this.userRepository.findByLoginId(loginId);
    if (!user) {
      throw new Error("회원정보가 없습니다!");
    }

    // 비밀번호 검증
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("회원정보가 없습니다!");
    }

    // JWT payload 구성 (userId와 loginId 포함)
    const payload = {
      userId: user.userId,
      loginId: user.loginId,
    };

    // JWT 토큰 생성
    const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });

    const refreshToken = jwt.sign(payload, process.env.JWT_SECRET as string, {
      expiresIn: "7d",
    });

    return {
      token,
      refreshToken,
      user: {
        userId: user.userId,
        loginId: user.loginId,
      },
    };
  }
}
