import { IStockRepository } from '@/domain/repositories/IStockRepository';
import { Stock } from '@prisma/client';
import { prisma } from "@/config/prismaClient";

export class PrStockRepository implements IStockRepository {
  async findStockByCode(stockCode: string): Promise<Stock | null>  {
    const stock = await prisma.stock.findFirst({
      where: { stockCode: stockCode },
    });
    return stock;
  }
}
