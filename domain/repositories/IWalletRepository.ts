import { Wallet } from "@prisma/client";

export interface IWalletRepository {
    findWalletByUserId(userId: string): Promise<Wallet | null>;
    createWallet(userId: string): Promise<Wallet>;
    updateWallet(userId: string, amount: number): Promise<Wallet>;
    updateAccountByUserId(userId: string, deposit: number): Promise<Wallet>
    deleteWallet(userId: string): Promise<Wallet>;
}