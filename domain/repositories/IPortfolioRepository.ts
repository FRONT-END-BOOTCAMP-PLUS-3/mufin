import { Portfolio } from "@prisma/client";

export interface IPortfolioRepository {
    getPortfoliosByUserId(userId: string): Promise<Portfolio[]>;
    getPortfolioByUserIdAndStockCode(userId: string, stockId: number): Promise<Portfolio | null>;
    upsertPortfolio(userId: string, stockId: number, stockCount: number): Promise<Portfolio>;
    deletePortfolio(portfolioId: number): Promise<Portfolio>;
}