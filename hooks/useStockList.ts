import { StockListResponseDto } from "@/application/usecases/home/dtos/StockListResponseDto";
import { fetchStockList } from "@/utils/fetchStock";
import { useQuery } from "@tanstack/react-query";

export function useStockList(path: string, initialData?: StockListResponseDto[]) {
    return useQuery({
        queryKey: ['stockList', path],
        queryFn: () => fetchStockList(path),
        initialData,
        staleTime: 1000 * 60, // 1분 동안 데이터 신선한 것으로 간주
        refetchInterval: 1000 * 60,
    }) 
}