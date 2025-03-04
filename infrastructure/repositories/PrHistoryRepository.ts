import { prisma } from "@/config/prismaClient";
import { IHistoryRepository } from "@/domain/repositories/IHistoryRepository";
import { History, TransactionType } from "@prisma/client";

export class PrHistoryRepository implements IHistoryRepository {
    async getHistoriesByUserId(userId: string): Promise<History[]> {
        return await prisma.history.findMany({
            where: { userId }
        });
    }

    async createHistory(userId: string, stockId: number, transactionType: TransactionType, price?: number, quantity?: number): Promise<History> {
        return await prisma.history.create({
            data: { userId, stockId, transactionType, price, quantity }
        });
    }

    async deleteHistory(historyId: number): Promise<History> {
        return await prisma.history.delete({
            where: { historyId }
        });
    }
}