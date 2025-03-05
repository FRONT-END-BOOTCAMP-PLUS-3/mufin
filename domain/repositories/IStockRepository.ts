import { Stock } from "@prisma/client";

export interface IStockRepository {
    findStockByCode(stockCode: string): Promise<Stock | null>;
  }
  