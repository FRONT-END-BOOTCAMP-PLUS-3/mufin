import { Portfolio, Stock } from "@prisma/client";

export interface IPortfolioRepository {
    //Portfolio + Stock 정보를 포함하도록 반환 타입 변경
    findPortfoliosByUserId(userId: string): Promise<(Portfolio & { stock: Stock })[]>;
    findPortfolioByUserIdAndStockCode(userId: string, stockId: number): Promise<Portfolio | null>;
    savePortfolio(userId: string, stockId: number, stockQty: number): Promise<Portfolio>;
    deletePortfolio(portfolioId: number): Promise<Portfolio>;
}
