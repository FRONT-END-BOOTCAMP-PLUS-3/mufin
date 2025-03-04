import { IStockRepository } from '@/domain/repositories/IStockRepository';
import { Stock } from '@prisma/client';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class PrStockRepository implements IStockRepository {
  // 주식 코드에 따른 주식 정보 조회
  async getStockByCode(stockCode: string): Promise<Stock | null>  {
    const stock = await prisma.stock.findFirst({
      where: { stockCode: stockCode },
    });

    return stock;
  }
}
