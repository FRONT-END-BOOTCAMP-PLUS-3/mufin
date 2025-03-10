import { IStockRepository } from '@/domain/repositories/IStockRepository';
import { Stock } from '@prisma/client';
import { prisma } from "@/config/prismaClient";

export class PgStockRepository implements IStockRepository {
  async findStockByCode(stockCode: string): Promise<Stock | null>  {
    const stock = await prisma.stock.findFirst({
      where: { stockCode },
    });
    return stock;
  }

  async findStockById(stockId: number): Promise<Stock | null>  {
    const stock = await prisma.stock.findFirst({
      where: { stockId },
    });
    return stock;
  }

  async findStocksByCategory(category: number): Promise<Stock[] | []> {
    const stocks = await prisma.stock.findMany({
      where: { category },
    });
    return stocks;
  }
}
