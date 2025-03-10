import { StockChartDto } from "@/application/usecases/kis/dtos/StockChartDto";

export interface IGetMinChartUseCase {
    execute(symbol: string): Promise<StockChartDto[]>;
}