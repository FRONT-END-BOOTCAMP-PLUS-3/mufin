import { IUserRepository } from "@/domain/repositories/IUserRepository";
import { User } from "@prisma/client";

export class GetUserInfoUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(userId: string): Promise<User> {
    if (!userId) {
      throw new Error("Unauthorized");
    }

    // 3. DB에서 사용자 정보 조회
    const user = await this.userRepository.findUserByUserId(userId);
    
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }
}
