import { Stock } from "@prisma/client";

export interface IStockRepository {
    findStockByCode(stockCode: string): Promise<Stock | null>;
    findStockById(stockId: number): Promise<Stock | null>;
    findStocksByCategory(category: number): Promise<Stock [] | null>
  }
  