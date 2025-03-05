import { prisma } from "@/config/prismaClient";
import { IPortfolioRepository } from "@/domain/repositories/IPortfolioRepository";
import { Portfolio } from "@prisma/client";

export class PrPortfolioRepository implements IPortfolioRepository {

    async getPortfoliosByUserId(userId: string): Promise<Portfolio[]> {
        return await prisma.portfolio.findMany({
            where: { userId }
        });
    }

    async getPortfolioByUserIdAndStockCode(userId: string, stockId: number): Promise<Portfolio | null> {
        return await prisma.portfolio.findFirst({
            where: {
                userId,
                stockId,
              },
        });
    }

    async upsertPortfolio(userId: string, stockId: number, stockCount: number): Promise<Portfolio> {
        const existingPortfolio = await prisma.portfolio.findFirst({
            where: {
                userId,
                stockId, 
              },
        });
    
        if (existingPortfolio) {
            // 기존 데이터가 있으면 stockCount를 주어진 값으로 덮어쓰기
            return await prisma.portfolio.update({
                where: { portfolioId: existingPortfolio.portfolioId },
                data: { stockCount }, // 새 수량으로 덮어씀
            });
        } else {
            // 없으면 새로운 데이터 생성
            return await prisma.portfolio.create({
                data: { userId, stockId, stockCount },
            });
        }
    }
    
    async deletePortfolio(portfolioId: number): Promise<Portfolio> {
        return await prisma.portfolio.delete({
            where: { portfolioId }
        });
    }
}