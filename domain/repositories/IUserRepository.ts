// src/domain/repositories/IUserRepository.ts
import { User } from "@prisma/client";

export interface IUserRepository {
  findByLoginId(loginId: string): Promise<User | null>;
  createUser(data: {
    name: string;
    loginId: string;
    email: string;
    password: string;
  }): Promise<User>;
  deleteByLoginId(loginId: string): Promise<User>;
}
