
import { SellDto } from "@/application/usecases/tradeaction/dtos/SellDto";
import { IHistoryRepository } from "@/domain/repositories/IHistoryRepository";
import { IPortfolioRepository } from "@/domain/repositories/IPortfolioRepository";
import { IWalletRepository } from "@/domain/repositories/IWalletRepository";

export class HandleSellUseCase {
  private walletRepository: IWalletRepository;
  private portfolioRepository: IPortfolioRepository;
  private historyRepository: IHistoryRepository;

  constructor(
    walletRepository: IWalletRepository,
    portfolioRepository: IPortfolioRepository,
    historyRepository: IHistoryRepository
  ) {
    this.walletRepository = walletRepository;
    this.portfolioRepository = portfolioRepository;
    this.historyRepository = historyRepository;
  }

  public async handleSell(sellDto: SellDto) {
    const { userId, stockId, quantity, price, totalAmount } = sellDto;

    // 1. 지갑 정보 조회
    const wallet = await this.walletRepository.findWalletByUserId(userId);
    if (!wallet) {
        throw new Error('지갑 정보를 찾을 수 없습니다.');
    }

    // 2. 지갑에서 현금 추가
    if (wallet.cash === null) {
        wallet.cash = BigInt(0);
    }
    wallet.cash += BigInt(totalAmount);

    // 3. 포트폴리오에서 주식 수량 감소
    const existingStock = await this.portfolioRepository.findPortfolioByUserIdAndStockCode(userId, stockId);
    
    if (existingStock && existingStock.stockQty >= quantity) {
      const newQuantity = existingStock.stockQty - quantity;
      
      // 주식 수량이 0이면 포트폴리오에서 삭제
      if (newQuantity === 0) {
        await this.portfolioRepository.deletePortfolio(existingStock.portfolioId);
      } else {
        const newTotalAmount = existingStock.total - (existingStock.total / BigInt(existingStock.stockQty) * BigInt(newQuantity));
        await this.portfolioRepository.savePortfolio(userId, stockId, newQuantity, Number(newTotalAmount));
      }
    }

    // 4. 거래 내역 기록
    await this.historyRepository.createHistory(userId, stockId, 'SELL', price, quantity);

    // 5. 지갑 업데이트
    await this.walletRepository.updateCashByUserId(userId, Number(totalAmount));

    // 6. 성공 메시지 반환
    return { message: '판매가 성공적으로 처리되었습니다.' };
  }

  public async getPortfolio(userId: string, stockId: number) {
    const portfolio = await this.portfolioRepository.findPortfolioByUserIdAndStockCode(userId, stockId);
    return portfolio ? portfolio.stockQty : 0;
  }
}
