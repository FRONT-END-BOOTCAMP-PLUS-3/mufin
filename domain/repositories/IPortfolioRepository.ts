import { Portfolio } from "@prisma/client";

export interface IPortfolioRepository {
    getPortfoliosByUserId(userId: string): Promise<Portfolio[]>;
    createPortfolio(userId: string, stockId: number, stockCount: number): Promise<Portfolio>;
    upsertPortfolio(userId: string, stockId: number, stockCount: number): Promise<Portfolio>;
    deletePortfolio(portfolioId: number): Promise<Portfolio>;

}