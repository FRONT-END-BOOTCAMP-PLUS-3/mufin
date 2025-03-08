import { CurrentPriceResponseDto } from "@/application/usecases/kis/dtos/CurrentPriceResponseDto";

export interface StockListResponseDto {
    stockId: number;
    stockCode: string;
    stockName: string;
    category?: number;
    stockImage?: string;
    currentPrice: CurrentPriceResponseDto;
}