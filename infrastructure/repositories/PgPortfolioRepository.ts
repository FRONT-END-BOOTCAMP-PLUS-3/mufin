import { prisma } from "@/config/prismaClient";
import { IPortfolioRepository, PortfolioWithStock } from "@/domain/repositories/IPortfolioRepository";
import { Portfolio } from "@prisma/client";

export class PgPortfolioRepository implements IPortfolioRepository {
    // 사용자 포트폴리오 목록 조회 (주식 정보 포함)
    async findPortfoliosByUserId(userId: string): Promise<PortfolioWithStock[]> {
        return (await prisma.portfolio.findMany({
            where: { userId },
            include: {
                stock: {
                    select: {
                        stockCode: true,
                        stockName: true,
                        stockImage: true,
                    },
                },
            },
        })) as PortfolioWithStock[];
    }

    async findPortfolioByUserIdAndStockCode(userId: string, stockId: number): Promise<Portfolio | null> {
        return await prisma.portfolio.findFirst({
            where: {
                userId,
                stockId,
            },
        });
    }

    async savePortfolio(userId: string, stockId: number, stockQty: number, total:number): Promise<Portfolio> {
        return await prisma.portfolio.upsert({
            where: {
                userId_stockId: { userId, stockId },
            },
            update: { stockQty, updatedAt: new Date(), total },
            create: { userId, stockId, stockQty, total },
        });
    }

    async deletePortfolio(portfolioId: number): Promise<Portfolio> {
        return await prisma.portfolio.delete({
            where: { portfolioId },
        });
    }
}
