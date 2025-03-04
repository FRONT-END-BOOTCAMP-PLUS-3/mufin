import { prisma } from "@/config/prismaClient";
import { IWalletRepository } from "@/domain/repositories/IWalletRepository";
import { Wallet } from "@prisma/client";

export class PrWalletRepository implements IWalletRepository {
    async getWalletByUserId(userId: string): Promise<Wallet | null> {
        return await prisma.wallet.findUnique({
            where: { userId }
        });
    }

    async createWallet(userId: string): Promise<Wallet> {
        return await prisma.wallet.create({
            data: { userId }
        });
    }

    async updateWallet(userId: string, data: Partial<Wallet>): Promise<Wallet> {
        return await prisma.wallet.update({
            where: { userId },
            data
        });
    }

    async deleteWallet(userId: string): Promise<Wallet> {
        return await prisma.wallet.delete({
            where: { userId }
        });
    }
}