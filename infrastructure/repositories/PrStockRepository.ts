import { IStockRepository } from '@/domain/repositories/IStockRepository';
import { Stock } from '@prisma/client';
import { prisma } from "@/config/prismaClient";

export class PrStockRepository implements IStockRepository {
  // 주식 코드에 따른 주식 정보 조회
  async getStockByCode(stockCode: string): Promise<Stock | null>  {
    const stock = await prisma.stock.findFirst({
      where: { stockCode: stockCode },
      select: {
        stockId: true,  
        stockCode: true,  
        stockName: true,
        category: true,
        stockImage: true,
        stockOpen: true,
        faceValue: true,
        totalShare: true,
        createdAt: true,
        updatedAt: true
      },
    });
    return stock;
  }
}
