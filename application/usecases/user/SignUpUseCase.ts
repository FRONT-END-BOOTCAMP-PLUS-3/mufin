import bcrypt from "bcrypt";
import { IUserRepository } from "@/domain/repositories/IUserRepository";
import { IWalletRepository } from "@/domain/repositories/IWalletRepository";

interface SignupRequest {
  name: string;
  loginId: string;
  email: string;
  password: string;
}

interface SignupResponse {
  message: string;
  user: {
    userId: string;
    name: string;
    email: string;
    loginId: string;
  };
}

export class SignUpUseCase {
  constructor(
    private userRepository: IUserRepository,
    private walletRepository: IWalletRepository
  ) {}

  async execute(request: SignupRequest): Promise<SignupResponse> {
    const { name, loginId, email, password } = request;

    // 필수 필드 검증
    if (!name || !loginId || !email || !password) {
      throw new Error("모든 필드를 입력하세요.");
    }

    // 아이디 중복 체크
    const existingUser = await this.userRepository.findByLoginId(loginId);
    if (existingUser) {
      throw new Error("중복된 아이디입니다.");
    }

    // 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(password, 10);

    // 사용자 정보 저장
    const createdUser = await this.userRepository.createUser({
      name,
      loginId,
      email,
      password: hashedPassword,
    });

    // 회원가입 후 지갑 생성
    await this.walletRepository.createWallet(createdUser.userId);

    return {
      message: "회원가입 성공",
      user: {
        userId: createdUser.userId,
        name: createdUser.name,
        email: createdUser.email,
        loginId: createdUser.loginId,
      },
    };
  }
}
