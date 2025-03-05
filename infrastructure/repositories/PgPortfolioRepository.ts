import { prisma } from "@/config/prismaClient";
import { IPortfolioRepository } from "@/domain/repositories/IPortfolioRepository";
import { Portfolio } from "@prisma/client";

export class PgPortfolioRepository implements IPortfolioRepository {

    async findPortfoliosByUserId(userId: string): Promise<Portfolio[]> {
        return await prisma.portfolio.findMany({
            where: { userId }
        });
    }

    async findPortfolioByUserIdAndStockCode(userId: string, stockId: number): Promise<Portfolio | null> {
        return await prisma.portfolio.findFirst({
            where: {
                userId,
                stockId,
              },
        });
    }

    async savePortfolio(userId: string, stockId: number, stockQty: number): Promise<Portfolio> {
        return await prisma.portfolio.upsert({
          where: {
            userId_stockId: { userId, stockId },
          },
          update: { stockQty },
          create: { userId, stockId, stockQty },
        });
      }
    
    async deletePortfolio(portfolioId: number): Promise<Portfolio> {
        return await prisma.portfolio.delete({
            where: { portfolioId }
        });
    }
}