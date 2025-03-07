import { StockInfoDto } from "@/application/usecases/stock/dtos/StockInfoDto";

export interface IStockInfoUseCase{
    getStockInfoByCode(stockCode: string): Promise<StockInfoDto | null>;
}