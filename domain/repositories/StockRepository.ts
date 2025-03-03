import { Stock } from "@prisma/client";

export interface IStockRepository {
    getStockByCode(stockCode: string): Promise<Stock | null>;
  }
  