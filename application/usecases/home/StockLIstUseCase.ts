import { IStockListUseCase } from "@/application/usecases/home/interfaces/IStockListUseCase";
import { StockListResponseDto } from "@/application/usecases/home/dtos/StockListResponseDto";
import { IGetCurrentPriceUseCase } from "@/application/usecases/kis/interfaces/IGetCurrentPriceUseCase";
import { IStockInfoUseCase } from "@/application/usecases/stock/interfaces/IStockInfoUseCase";

export class StockListUseCase implements IStockListUseCase {

    constructor(
        private readonly getCurrentPriceUseCase : IGetCurrentPriceUseCase,
        private readonly stockInfoUseCase: IStockInfoUseCase
    ){}
    async execute(stockCode: string): Promise<StockListResponseDto | null> {
        const [stockInfo, currentPrice] = await Promise.all([
            this.stockInfoUseCase.getStockInfoByCode(stockCode),
            this.getCurrentPriceUseCase.execute(stockCode)
        ]);

        if(!stockInfo ||!currentPrice){
            return null;
        }

        return {
            stockId: stockInfo.stockId,
            stockCode: stockCode,
            stockName: stockInfo.stockName,
            category: stockInfo.category || 0,
            stockImage: stockInfo.stockImage || "",
            currentPrice
        }
        
    }

}