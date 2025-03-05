import { IUserRepository } from "@/domain/repositories/IUserRepository";

export class DeleteUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(loginId: string) {
    // 실제 계정 삭제 로직
    const deletedUser = await this.userRepository.deleteByLoginId(loginId);
    return deletedUser;
  }
}
