import { StockInfoDto } from "@/application/usecases/stock/dtos/StockInfoDto";
import { IStockRepository } from "@/domain/repositories/IStockRepository";
import { IStockInfoUseCase } from "@/application/usecases/stock/interfaces/IStockInfoUseCase";


export class StockInfoUseCase implements IStockInfoUseCase{
  private stockRepository: IStockRepository;

  constructor(stockRepository: IStockRepository) {
    this.stockRepository = stockRepository;
  }

  // 주식 코드로 주식 정보 조회
  async getStockInfoByCode(stockCode: string): Promise<StockInfoDto | null> {
    const stock = await this.stockRepository.findStockByCode(stockCode);
    if (!stock) {
      return null;
    }

    const stockInfoDto: StockInfoDto = {
      stockId: stock.stockId, 
      stockCode: stock.stockCode,
      stockName: stock.stockName,
      category: stock.category || 0,
      stockImage: stock.stockImage || "",
      stockOpen: stock.stockOpen || "", 
      faceValue: stock.faceValue,
      totalShare: stock.totalShare,
    };

    return stockInfoDto;
  }
}
