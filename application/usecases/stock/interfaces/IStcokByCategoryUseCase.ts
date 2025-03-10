import { StockListResponseDto } from "@/application/usecases/home/dtos/StockListResponseDto";

export interface IStockByCategoryUseCase {
    execute(category: string): Promise<StockListResponseDto[]>;
}