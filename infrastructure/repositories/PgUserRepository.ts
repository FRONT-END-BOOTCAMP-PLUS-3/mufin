// src/infrastructure/repositories/UserRepository.ts
import { IUserRepository } from "@/domain/repositories/IUserRepository";
import { prisma } from "@/config/prismaClient";
import { User } from "@prisma/client";

export class UserRepository implements IUserRepository {
  async findByLoginId(loginId: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: { loginId },
    });
  }

  async createUser(data: {
    name: string;
    loginId: string;
    email: string;
    password: string;
  }): Promise<User> {
    return await prisma.user.create({
      data: {
        name: data.name,
        loginId: data.loginId,
        email: data.email,
        password: data.password,
      },
    });
  }

  async deleteByLoginId(loginId: string): Promise<User> {
    return await prisma.user.delete({
      where: { loginId },
    });
  }
}
