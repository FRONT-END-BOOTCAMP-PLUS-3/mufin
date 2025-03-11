import { SearchDto } from "@/application/usecases/search/dtos/SearchDto"
import { IStockRepository } from "@/domain/repositories/IStockRepository";

export class SearchUseCase {
  private stockRepository: IStockRepository;

  constructor(stockRepository: IStockRepository) {
    this.stockRepository = stockRepository;
  }

  // 주식 코드로 주식 정보 조회
  async getStockInfoByName(stockName: string): Promise<SearchDto[]> {
    const stocks = await this.stockRepository.findStockByName(stockName);
  
    if (!stocks || stocks.length === 0) {
      return [];
    }
  
    return stocks.map(stock => ({
      stockId: stock.stockId, 
      stockCode: stock.stockCode,
      stockName: stock.stockName,
      stockImage: stock.stockImage || "",
    }));
  }
}
