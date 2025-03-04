import { Wallet } from "@prisma/client";

export interface IWalletRepository {
    getWalletByUserId(userId: string): Promise<Wallet | null>;
    createWallet(userId: string): Promise<Wallet>;
    updateWallet(userId: string, data: Partial<Wallet>): Promise<Wallet>;
    deleteWallet(userId: string): Promise<Wallet>;
}