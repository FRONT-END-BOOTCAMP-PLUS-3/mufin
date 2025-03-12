import { fetchKISOrderBook } from "@/infrastructure/api/kisApiClient";
import { OrderBookResponseDto } from "@/application/usecases/kis/dtos/OrderBookResponseDto";

export class GetOrderBookUseCase {

    /**
     * 주식 종목 코드로 호가창 정보 조회
     * 
     * @param stockCode - 조회할 종목의 코드
     * @returns 성공 시 OrderBookResponseDto 반환, 데이터가 없으면 null 반환
     */
    async execute(stockCode: string): Promise<OrderBookResponseDto | null> {

        // infrastructure 계층의 외부 API 호출
        const rawData = await fetchKISOrderBook(stockCode);
  
        // API 데이터가 없을 때 null 반환
        if (!rawData || !rawData.output1) return null;
  
        // 실제 데이터는 output1 안에 있으므로, 그 안에서 데이터 추출
        const data = rawData.output1;

        // 데이터가 있을 시 DTO로 변환하여 반환
        const stockOrderBook: OrderBookResponseDto = {
            askPrices: {
                askp1: data.askp1,
                askp3: data.askp3,
                askp5: data.askp5,
                askp7: data.askp7,
                askp9: data.askp9,
                askp10: data.askp10
            },
            bidPrices: {
                bidp1: data.bidp1,
                bidp3: data.bidp3,
                bidp5: data.bidp5,
                bidp7: data.bidp7,
                bidp9: data.bidp9,
                bidp10: data.bidp10
            },
            askVolumes: {
                askp_rsqn1: data.askp_rsqn1,
                askp_rsqn3: data.askp_rsqn3,
                askp_rsqn5: data.askp_rsqn5,
                askp_rsqn7: data.askp_rsqn7,
                askp_rsqn9: data.askp_rsqn9,
                askp_rsqn10: data.askp_rsqn10
            },
            bidVolumes: {
                bidp_rsqn1: data.bidp_rsqn1,
                bidp_rsqn3: data.bidp_rsqn3,
                bidp_rsqn5: data.bidp_rsqn5,
                bidp_rsqn7: data.bidp_rsqn7,
                bidp_rsqn9: data.bidp_rsqn9,
                bidp_rsqn10: data.bidp_rsqn10
            },
            totalAskVolume: data.total_askp_rsqn,
            totalBidVolume: data.total_bidp_rsqn
        };
  
        return stockOrderBook;
    }
}
