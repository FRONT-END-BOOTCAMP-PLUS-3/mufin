import { prisma } from "@/config/prismaClient";
import { IPortfolioRepository } from "@/domain/repositories/IPortfolioRepository";
import { Portfolio, Stock } from "@prisma/client";

// ✅ Portfolio + Stock 정보를 포함하는 새로운 타입 정의
type PortfolioWithStock = Portfolio & { stock: Stock };

export class PgPortfolioRepository implements IPortfolioRepository {
    /**
     * 사용자의 전체 포트폴리오를 조회하면서 각 종목(stock) 정보를 포함하여 반환
     */
    async findPortfoliosByUserId(userId: string): Promise<PortfolioWithStock[]> {
        return await prisma.portfolio.findMany({
            where: { userId },
            select: {
                // ✅ stockQty 포함
                portfolioId: true,
                userId: true,
                stockId: true,
                stockQty: true, // ✅ stockQty 추가
                createdAt: true,
                updatedAt: true,
                stock: {
                    select: {
                        stockId: true,
                        stockCode: true,
                        stockName: true,
                        category: true,
                        stockImage: true,
                        stockOpen: true,
                        faceValue: true,
                        totalShare: true,
                        createdAt: true,
                        updatedAt: true,
                    },
                },
            },
        });
    }

    /**
     * 특정 사용자와 특정 종목(stockId)에 해당하는 포트폴리오를 조회하면서 stock 정보 포함
     */
    async findPortfolioByUserIdAndStockCode(userId: string, stockId: number): Promise<PortfolioWithStock | null> {
        return await prisma.portfolio.findFirst({
            where: { userId, stockId },
            select: {
                // ✅ stockQty 포함
                portfolioId: true,
                userId: true,
                stockId: true,
                stockQty: true, // ✅ stockQty 추가
                createdAt: true,
                updatedAt: true,
                stock: {
                    select: {
                        stockId: true,
                        stockCode: true,
                        stockName: true,
                        category: true,
                        stockImage: true,
                        stockOpen: true,
                        faceValue: true,
                        totalShare: true,
                        createdAt: true,
                        updatedAt: true,
                    },
                },
            },
        });
    }

    /**
     * 사용자의 포트폴리오 저장 (이미 존재하면 업데이트, 없으면 생성)
     */
    async savePortfolio(userId: string, stockId: number, stockQty: number): Promise<Portfolio> {
        return await prisma.portfolio.upsert({
            where: {
                userId_stockId: { userId, stockId },
            },
            update: { stockQty, updatedAt: new Date() },
            create: { userId, stockId, stockQty },
        });
    }

    /**
     * 특정 포트폴리오 삭제
     */
    async deletePortfolio(portfolioId: number): Promise<Portfolio> {
        return await prisma.portfolio.delete({
            where: { portfolioId },
        });
    }
}
