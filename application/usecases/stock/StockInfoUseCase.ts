import { StockInfoDto } from "@/application/usecases/stock/dtos/StockInfoDto";
import { IStockRepository } from "@/domain/repositories/IStockRepository";


export class StockInfoUseCase {
  private stockRepository: IStockRepository;

  constructor(stockRepository: IStockRepository) {
    this.stockRepository = stockRepository;
  }

  // 주식 코드로 주식 정보 조회
  async getStockInfoByCode(stockCode: string): Promise<StockInfoDto | null> {
    const stock = await this.stockRepository.getStockByCode(stockCode);
    if (!stock) {
      return null;
    }

    const stockInfoDto: StockInfoDto = {
      stockCode: stock.stockCode,
      stockName: stock.stockName,
      stockOpen: stock.stockOpen || '', 
      faceValue: stock.faceValue,
      totalShare: stock.totalShare,
    };

    return stockInfoDto;
  }
}
