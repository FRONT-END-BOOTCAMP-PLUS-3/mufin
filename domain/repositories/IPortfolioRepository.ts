import { Portfolio, Stock } from "@prisma/client";
// Portfolio + Stock 정보를 포함하는 타입
export type PortfolioWithStock = {
    portfolioId: number;
    userId: string;
    stockId: number;
    stockQty: number;
    createdAt: Date;
    updatedAt: Date;
    stock: {
        stockCode: string;
        stockName: string;
        //stockImage: string;
    };
};
export interface IPortfolioRepository {
    //Portfolio + Stock 정보를 포함하도록 반환 타입 변경
    findPortfoliosByUserId(userId: string): Promise<PortfolioWithStock[]>;
    findPortfolioByUserIdAndStockCode(userId: string, stockId: number): Promise<Portfolio | null>;
    savePortfolio(userId: string, stockId: number, stockQty: number): Promise<Portfolio>;
    deletePortfolio(portfolioId: number): Promise<Portfolio>;
}
