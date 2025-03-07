import { BuyDto } from "@/application/usecases/trade/dtos/BuyDto";
import { IWalletRepository } from "@/domain/repositories/IWalletRepository";
import { IPortfolioRepository } from "@/domain/repositories/IPortfolioRepository";
import { IHistoryRepository } from "@/domain/repositories/IHistoryRepository";

export class HandleBuyUseCase {
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


  public async handleBuy(buyDto: BuyDto) {
    const { userId, stockId, quantity, price, totalAmount } = buyDto;

    // 1. 지갑 정보 조회
    const wallet = await this.walletRepository.findWalletByUserId(userId);
    if (!wallet) {
        throw new Error('지갑 정보를 찾을 수 없습니다.');
    }

    // 2. 지갑에서 현금 차감
    if (wallet.cash === null || wallet.cash < totalAmount) {
        throw new Error('잔액 부족');
    }
    wallet.cash -= BigInt(totalAmount);

    // 3. 포트폴리오에 주식 추가
    const portfolio = await this.portfolioRepository.findPortfoliosByUserId(userId);
    const existingStock = portfolio.find(item => item.stockId === stockId);

    if (existingStock) {
        // 주식 수량 증가
        existingStock.stockQty += quantity;
        // 변경된 포트폴리오 업데이트
        await this.portfolioRepository.savePortfolio(userId, stockId, existingStock.stockQty);
    } else {
        // 주식이 없으면 새로 추가
        await this.portfolioRepository.savePortfolio(userId, stockId, quantity);
    }

    // 4. 거래 내역 기록
    await this.historyRepository.createHistory(userId, stockId, 'BUY', price, quantity);

    // 5. 지갑 업데이트
    await this.walletRepository.updateCashByUserId(userId, -Number(totalAmount));

    // 6. 성공 메시지 반환
    return { message: '구매가 성공적으로 처리되었습니다.' };
  }
}
