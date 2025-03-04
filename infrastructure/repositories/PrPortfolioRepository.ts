import { prisma } from "@/config/prismaClient";
import { IPortfolioRepository } from "@/domain/repositories/IPortfolioRepository";
import { Portfolio } from "@prisma/client";

export class PrPortfolioRepository implements IPortfolioRepository {

    async getPortfoliosByUserId(userId: string): Promise<Portfolio[]> {
        return await prisma.portfolio.findMany({
            where: { userId }
        });
    }

    async createPortfolio(userId: string, stockId: number, stockCount: number): Promise<Portfolio> {
        return await prisma.portfolio.create({
            data: { userId, stockId, stockCount }
        });
    }

    // userId와 stockId가 일치하는 컬럼이 있다면 업데이트 없다면 생성
    async upsertPortfolio(userId: string, stockId: number, stockCount: number): Promise<Portfolio> {
        const existingPortfolio = await prisma.portfolio.findFirst({
            where: { userId, stockId }
        });
    
        if (existingPortfolio) {
            // 기존 데이터가 있다면 stockCount만 업데이트
            return await prisma.portfolio.update({
                where: { portfolioId: existingPortfolio.portfolioId },
                data: { stockCount }
            });
        } else {
            // 없으면 새로운 데이터 생성
            return await prisma.portfolio.create({
                data: { userId, stockId, stockCount }
            });
        }
    }

    async deletePortfolio(portfolioId: number): Promise<Portfolio> {
        return await prisma.portfolio.delete({
            where: { portfolioId }
        });
    }
}