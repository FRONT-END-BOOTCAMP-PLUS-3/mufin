import { Portfolio } from "@prisma/client";

export interface IPortfolioRepository {
    findPortfoliosByUserId(userId: string): Promise<Portfolio[]>;
    findPortfolioByUserIdAndStockCode(userId: string, stockId: number): Promise<Portfolio | null>;
    savePortfolio(userId: string, stockId: number, stockQty: number): Promise<Portfolio>;
    deletePortfolio(portfolioId: number): Promise<Portfolio>;
}