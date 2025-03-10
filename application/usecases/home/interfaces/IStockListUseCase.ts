import { StockListResponseDto } from "@/application/usecases/home/dtos/StockListResponseDto";

export interface IStockListUseCase {
    execute(stockCode: string): Promise<StockListResponseDto | null>;
}