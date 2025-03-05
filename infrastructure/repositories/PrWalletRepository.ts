import { prisma } from "@/config/prismaClient";
import { IWalletRepository } from "@/domain/repositories/IWalletRepository";
import { Wallet } from "@prisma/client";

export class PrWalletRepository implements IWalletRepository {
    async findWalletByUserId(userId: string): Promise<Wallet | null> {
        return await prisma.wallet.findUnique({
            where: { userId }
        });
    }

    // 지갑 생성
    async createWallet(userId: string): Promise<Wallet> {
        return await prisma.wallet.create({
        data: {
            userId,
        },
        });
    }

    async updateWallet(userId: string, amount: number): Promise<Wallet> {
        return await prisma.wallet.update({
          where: { userId },
          data: {
            cash: {
              increment: amount,
            },
          },
        });
    }

    async deleteWallet(userId: string): Promise<Wallet> {
        return await prisma.wallet.delete({
            where: { userId }
        });
    }
}