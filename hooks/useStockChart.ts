import { StockChartDto } from "@/application/usecases/kis/dtos/StockChartDto";
import { transformStockChartData } from "@/utils/ChartUtils";
import { fetchStockChartData } from "@/utils/fetchStock"
import { marketOpen } from "@/utils/getMarketOpen";
import { useQuery } from "@tanstack/react-query"

export const useStockChart = (symbol: string, activePeriod: string) => {
    // marketOpen() 함수가 시장 개장을 판단하는 동기 함수라고 가정
    const isMarketOpen = marketOpen();
    return useQuery({
        queryKey: ["stockChartData", symbol, activePeriod],
        queryFn: async() => {
            const rawData: StockChartDto[] =  await fetchStockChartData(symbol, activePeriod)
            return transformStockChartData(rawData, symbol, activePeriod);
        },
        refetchInterval: isMarketOpen && activePeriod === "1m" ? 60000 : false, // 1분마다 데이터 요청
        staleTime: 1000 * 60, // 60초
    });
}
