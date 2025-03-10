import { StockChartDto } from "@/application/usecases/kis/dtos/StockChartDto";

export interface IGetStockChartUseCase {
    execute(symbol: string, activePeriod: string): Promise<StockChartDto[]>;
}