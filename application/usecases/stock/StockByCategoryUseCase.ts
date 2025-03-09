import { IStockByCategoryUseCase } from "@/application/usecases/stock/interfaces/IStcokByCategoryUseCase";
import { IStockRepository } from "@/domain/repositories/IStockRepository";
import { IGetCurrentPriceUseCase } from "@/application/usecases/kis/interfaces/IGetCurrentPriceUseCase";
import { Stock } from "@prisma/client";
import { StockListResponseDto } from "@/application/usecases/home/dtos/StockListResponseDto";

export class StockByCategoryUseCase implements IStockByCategoryUseCase{
    
    constructor(
        private readonly stockRepository: IStockRepository,
        private readonly getCurrentPriceUseCase: IGetCurrentPriceUseCase
    ) {}

    async execute(category: string) : Promise<StockListResponseDto[]> {
        const categoryNum = parseInt(category, 10);
        const stocks: Stock[] = await this.stockRepository.findStocksByCategory(categoryNum);

        if(stocks.length === 0) {
            throw new Error("not found StocksByCategory in useCases");
        }
        const updatedStocks: StockListResponseDto[] = await Promise.all(
        stocks.map(async(stock)=>{
            const currentPrice = await this.getCurrentPriceUseCase.execute(stock.stockCode);

            if(!currentPrice ){
                throw new Error("not found currentPrice in kis usecases");
            }

            return {
                index:0, // 임시 index, 나중에 업데이트 예정
                stockId: stock.stockId,
                stockCode: stock.stockCode,
                stockName: stock.stockName,
                category: stock.category || 0,
                stockImage: stock.stockImage || "",
                currentPrice, 
            }
        }));

        updatedStocks.sort(
            (a, b) => Number(b.currentPrice.stckPrpr) - Number(a.currentPrice.stckPrpr)
          );
      
          // 정렬 후에 index를 1부터 다시 부여
          const finalStocks = updatedStocks.map((stock, index) => ({
            ...stock,
            index: index + 1,
          }));
      

        return finalStocks;
    }

}