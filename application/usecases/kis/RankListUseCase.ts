import { IStockRepository } from "@/domain/repositories/IStockRepository";

import { fetchKISFluctuationRanks } from "@/infrastructure/api/kisApiClient";

import { RankResponseDto } from "@/application/usecases/kis/dtos/RankResponseDto";
import { IRankListUseCase } from "@/application/usecases/kis/interfaces/IRankListUseCase";

export interface KISRankListProps {
    stck_shrn_iscd: string;
    stck_prpr: string;
    prdy_vrss: string;
    prdy_ctrt: string;

}

export class RankListUseCase implements IRankListUseCase{

    constructor(private readonly stockRepository: IStockRepository) {}
    async execute (): Promise<RankResponseDto[]> {
        // type에 따른 API 호출 및 코드 프로퍼티 선택
        const rawData = await fetchKISFluctuationRanks();

        const stocks = await Promise.all(
            rawData.output.slice(0,4).map(async (stock: KISRankListProps) => {
                const stockCode = stock.stck_shrn_iscd; 
                const stockData = await this.stockRepository.findStockByCode(stockCode);
                return {
                    stockId: stockData?.stockId,
                    stockCode,
                    stockName: stockData?.stockName,
                    stockImage: stockData?.stockImage || "",

                    stckPrpr: stock.stck_prpr,
                    prdyVrss: stock.prdy_vrss,
                    prdyCtrt: stock.prdy_ctrt,
                };
            })
        );
        return stocks
    }
}