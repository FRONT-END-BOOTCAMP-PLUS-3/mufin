import { IHistoryRepository } from '@/domain/repositories/IHistoryRepository';
import { IStockRepository } from '@/domain/repositories/IStockRepository';

export class StockHistoryUseCase {
  private historyRepository: IHistoryRepository;
  private stockRepository: IStockRepository;

  constructor(historyRepository: IHistoryRepository, stockRepository: IStockRepository) {
    this.historyRepository = historyRepository;
    this.stockRepository = stockRepository;
  }

  public async getHistory(userId: string) {
    const history = await this.historyRepository.findHistoriesByUserId(userId);
    if (!history) {
      throw new Error("해당 사용자의 거래 내역을 찾을 수 없습니다.");
    }

    const historyWithStockName = await Promise.all(history.map(async (item) => {
      const stock = await this.stockRepository.findStockById(item.stockId);

      // Date 객체를 사용하여 날짜 포맷팅
      const formattedDate = new Date(item.createdAt).toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }).replace(/\./g, '.');  // 2025.01.01 형식으로 포맷

      const [year, month, day] = formattedDate.split('.');  // 년, 월, 일을 분리
      const shortYear = year.slice(2);  // "2025"에서 "20"을 제거하고 "25"만 남깁니다
      const useDate = `${shortYear}.${month}.${day}`; 

      return {
        stockId: item.stockId,
        historyQty: item.historyQty,
        price: item.price,
        transactionType: item.transactionType,
        createdAt: useDate,
        stockName: stock ? stock.stockName : '주식 이름 없음', // 주식 이름을 찾아서 반환
      };
    }));

    return historyWithStockName;
  }
}
