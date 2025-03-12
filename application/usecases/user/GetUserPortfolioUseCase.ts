// application/usecases/portfolio/GetUserPortfolioWithCurrentPricesUseCase.ts
import { IPortfolioRepository } from "@/domain/repositories/IPortfolioRepository";
import { IGetCurrentPriceUseCase } from "@/application/usecases/kis/interfaces/IGetCurrentPriceUseCase";

export interface PortfolioWithPrice {
    portfolioId: number;
    stockId: number;
    stockCode: string;
    stockName: string;
    stockQty: number;
    currentPrice: number;
    stockImage: string;
    profit: number;
    profitRate: number;
}

export class GetUserPortfolioUseCase {
    constructor(
        private portfolioRepository: IPortfolioRepository,
        private getCurrentPriceUseCase: IGetCurrentPriceUseCase
    ) {}

    async execute(userId: string): Promise<PortfolioWithPrice[]> {
        // portfolioRepository는 userId에 해당하는 포트폴리오 항목들을 조회하며,
        // 각 항목에는 관련된 Stock 정보가 포함되어 있음
        const portfolioItems = await this.portfolioRepository.findPortfoliosByUserId(userId);
        const result: PortfolioWithPrice[] = [];

        for (const item of portfolioItems) {
            // item.stock에 stockCode, stockName 등이 포함되어 있다고 가정합니다.
            const currentPriceDto = await this.getCurrentPriceUseCase.execute(item.stock.stockCode);
            if (!currentPriceDto) continue;

            const currentPrice = Number(currentPriceDto.stckPrpr);
            const totalValue = item.stockQty * currentPrice;
            const profit = Number(currentPriceDto.prdyVrss); // 전날 대비
            const profitRate = Number(currentPriceDto.prdyCtrt); // 전날 대비율

            result.push({
                portfolioId: item.portfolioId,
                stockId: item.stockId,
                stockCode: item.stock.stockCode,
                stockName: item.stock.stockName,
                stockQty: item.stockQty,
                stockImage: item.stock.stockImage,
                currentPrice,
                profit,
                profitRate,
            });
        }

        return result;
    }
}
