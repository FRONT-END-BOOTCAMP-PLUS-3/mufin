import { StockListResponseDto } from "@/application/usecases/home/dtos/StockListResponseDto";

export interface IStockListUseCase {
    execute(stockCodes: string[]): Promise<StockListResponseDto[] >;
}