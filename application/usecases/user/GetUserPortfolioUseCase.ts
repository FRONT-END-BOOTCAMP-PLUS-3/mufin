// application/usecases/portfolio/GetUserPortfolioWithCurrentPricesUseCase.ts
import { IPortfolioRepository } from "@/domain/repositories/IPortfolioRepository";
import { IGetCurrentPriceUseCase } from "@/application/usecases/kis/interfaces/IGetCurrentPriceUseCase";

export interface PortfolioWithPrice {
    stockId: number;
    stockCode: string;
    stockName: string;
    stockQty: number;
    currentPrice: number;
    marketValue: number; // 보유수량 * 현재가
}

export class GetUserPortfolioUseCase {
    constructor(
        private portfolioRepository: IPortfolioRepository,
        private getCurrentPriceUseCase: IGetCurrentPriceUseCase
    ) {}

    async execute(userId: string): Promise<PortfolioWithPrice[]> {
        // 1. 회원의 포트폴리오 데이터를 조회
        const portfolioData = await this.portfolioRepository.findPortfoliosByUserId(userId);

        // 2. 각 주식 종목에 대해 현재가 정보를 가져오고 병합
        const result: PortfolioWithPrice[] = [];

        for (const holding of portfolioData.holdings) {
            // holding.stockCode는 주식 종목 코드라고 가정
            const currentPriceDto = await this.getCurrentPriceUseCase.execute(holding.stockCode);
            if (!currentPriceDto) continue; // 데이터가 없으면 건너뜀

            const currentPrice = Number(currentPriceDto.stckPrpr);
            const marketValue = holding.stockQty * currentPrice;

            result.push({
                stockId: holding.stockId,
                stockCode: holding.stockCode,
                stockName: holding.stockName,
                stockQty: holding.stockQty,
                currentPrice,
                marketValue,
            });
        }
        return result;
    }
}
