import { prisma } from "@/config/prismaClient";
import { IWalletRepository } from "@/domain/repositories/IWalletRepository";
import { Wallet } from "@prisma/client";

export class PgWalletRepository implements IWalletRepository {
    async findWalletByUserId(userId: string): Promise<Wallet | null> {
        return await prisma.wallet.findUnique({
            where: { userId }
        });
    }

    // 회원가입 할때 지갑 생성하기
    async createWallet(userId: string): Promise<Wallet> {
        return await prisma.wallet.create({
        data: {
            userId,
        },
        });
    }

    async updateCashByUserId(userId: string, amount: number): Promise<Wallet> {
        return await prisma.wallet.update({
          where: { userId },
          data: {
            cash: {
              increment: amount,
            },
          },
        });
    }
    
    /**
     * 
     * @param userId : UUID타입의 user고유의 PK
     * @param depositAmount : 입금된 가격 
     * @returns 입금된 가격 변경 후 Wallet객체 반환
     */
    async updateAccountByUserId(userId: string, depositAmount: number): Promise<Wallet> {
        return await prisma.wallet.update({
          where: { userId },
          data: {
            account: {
              increment: depositAmount,
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