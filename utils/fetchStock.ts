import { StockListResponseDto } from "@/application/usecases/home/dtos/StockListResponseDto";
import { StockChartDto } from "@/application/usecases/kis/dtos/StockChartDto";
import { env } from "@/config/env";

export const fetchStockChartData = async(
    symbol: string, 
    activePeriod: string,
): Promise<StockChartDto[]> => {
    const response = await fetch(`/api/stock/${symbol}?activePeriod=${activePeriod}`);
    if (!response.ok) {
        throw new Error("Failed to fetch stock data");
    }
    return await response.json();
}

export async function fetchStockList(path: string): Promise<StockListResponseDto[]> {
    const res = await fetch(`${env.NEXT_PUBLIC_BASE_URL}${path}`, {
      cache: "no-store", // 기본적으로 새로운 요청을 보냅니다.
    });
  
    if (!res.ok) {
      throw new Error('Failed to fetch stock data');
    }
  
    return await res.json();
  }