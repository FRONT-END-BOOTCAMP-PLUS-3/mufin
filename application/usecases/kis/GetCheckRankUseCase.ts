import { fetchKISCheckRanks } from "@/infrastructure/api/kisApiClient";
import { IGetCheckRankUseCase } from "@/application/usecases/kis/interfaces/IGetCheckRankUseCase";
import { IStockRepository } from "@/domain/repositories/IStockRepository";
import { CheckRankResponseDto } from "@/application/usecases/kis/dtos/CheckRankResponseDto";

export interface KISCheckRankProps {
    stck_shrn_iscd: string;
    stck_prpr: string;
    prdy_vrss: string;
    prdy_ctrt: string;
}

export class GetCheckRankUseCase implements IGetCheckRankUseCase{

    constructor(private readonly stockRepository: IStockRepository) {}
    async execute (): Promise<CheckRankResponseDto[]> {
        const rawData = await fetchKISCheckRanks();
        const stocks = await Promise.all(
            rawData.output.map(async (stock: KISCheckRankProps) => {
                const stockData= await this.stockRepository.findStockByCode(stock.stck_shrn_iscd);
                return {
                    stockId: stockData?.stockId,
                    stockCode: stock.stck_shrn_iscd,
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