import { prisma } from "@/config/prismaClient";
import { IWalletRepository } from "@/domain/repositories/IWalletRepository";
import { Wallet } from "@prisma/client";

export class PrWalletRepository implements IWalletRepository {
    async getWalletByUserId(userId: string): Promise<Wallet | null> {
        return await prisma.wallet.findUnique({
            where: { userId }
        });
    }

    // 지갑 생성
    async createWallet(userId: string): Promise<Wallet> {
        return await prisma.wallet.create({
        data: {
            userId,
            cash: 0,  // 기본값 설정
            account: 1000000, // 기본값 설정
            target: 2000000, // 기본값 설정
        },
        });
    }

    async updateWallet(userId: string, amount: number): Promise<Wallet> {
        return await prisma.wallet.update({
          where: { userId },
          data: {
            cash: {
              increment: amount, // 양수면 증가, 음수면 차감
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