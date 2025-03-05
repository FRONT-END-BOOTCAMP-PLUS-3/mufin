import { PrPortfolioRepository } from "@/infrastructure/repositories/PrPortfolioRepository";
import { PrWalletRepository } from "@/infrastructure/repositories/PrWalletRepository";
import { PrHistoryRepository } from "@/infrastructure/repositories/PrHistoryRepository";
import { SellDto } from "@/application/usecases/trade/dtos/SellDto";
import { PrStockRepository } from "@/infrastructure/repositories/PrStockRepository";

export class HandleSellUseCase {
  private portfolioRepository = new PrPortfolioRepository();
  private walletRepository = new PrWalletRepository();
  private historyRepository = new PrHistoryRepository();
  private stockRepository = new PrStockRepository();

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
    const portfolio = await this.portfolioRepository.findPortfoliosByUserId(userId);
    const existingStock = portfolio.find(item => item.stockId === stockId);
    
    if (existingStock && existingStock.stockQty >= quantity) {
      existingStock.stockQty -= quantity;
      
      // 주식 수량이 0이면 포트폴리오에서 삭제
      if (existingStock.stockQty === 0) {
        await this.portfolioRepository.deletePortfolio(existingStock.portfolioId);
      }
    } else {
      throw new Error('보유 주식 수 부족');
    }

    // 4. 거래 내역 기록
    await this.historyRepository.createHistory(userId, stockId, 'SELL', price, quantity);

    // 5. 지갑과 포트폴리오 업데이트
    await this.walletRepository.updateWallet(userId, Number(totalAmount));
    await this.portfolioRepository.savePortfolio(userId, stockId, existingStock.stockQty);

    // 6. 성공 메시지 반환
    return { message: '판매가 성공적으로 처리되었습니다.' };
  }
}
