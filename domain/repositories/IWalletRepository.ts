import { Wallet } from "@prisma/client";

export interface IWalletRepository {
    findWalletByUserId(userId: string): Promise<Wallet | null>;
    createWallet(userId: string): Promise<Wallet>;
    updateCashByUserId(userId: string, amount: number): Promise<Wallet>;
    updateAccountByUserId(userId: string, deposit: number): Promise<Wallet>;
    updateCashAccountWalletByUserId(userId: string, cash: number, account: number): Promise<Wallet>;
    deleteWallet(userId: string): Promise<Wallet>;
}
