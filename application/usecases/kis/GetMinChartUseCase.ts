import { fetchKISMinChart } from "@/infrastructure/api/kisApiClient";
import { StockChartDto } from "@/application/usecases/kis/dtos/StockChartDto";
import { IGetMinChartUseCase } from "@/application/usecases/kis/interfaces/IGetMinChartUseCase";

export interface KISStockChartItem {
  stck_bsop_date: string;
  stck_oprc: string;
  stck_hgpr: string;
  stck_lwpr: string;
  stck_clpr: string;
  stck_cntg_hour: string;
  stck_prpr: string;
}

const getBaselineTime = (now: Date): Date => {
  const marketClose = new Date(now);
  marketClose.setHours(15, 20, 0, 0);

  const marketOpen = new Date(now);
  marketOpen.setHours(9, 0, 0, 0);

  // 장 마감 이후이거나 개장 전이면 marketClose를 기준으로 사용
  return now >= marketClose || now < marketOpen ? marketClose : now;
};

const getCurrentTime = (offset: number): string => {
  const now = new Date();
  const baseline = getBaselineTime(now);

  // offset에 따른 분 단위 차감 (예: offset 1이면 31분 차감)
  baseline.setMinutes(baseline.getMinutes() - offset * 31);

  const hours = baseline.getHours().toString().padStart(2, "0");
  const minutes = baseline.getMinutes().toString().padStart(2, "0");

  return `${hours}${minutes}00`;
};

export class GetMinChartUseCase implements IGetMinChartUseCase {
  /**
   * 주어진 symbol에 대해 4회 KIS 분봉 차트 데이터를 조회합니다.
   * @param symbol 주식 종목 코드
   * @returns 조회된 데이터 배열
   */
  async execute(symbol: string): Promise<StockChartDto[]> {
    // 여러 offset에 대해 API 호출 (예: 4회)
    const requests = Array.from({ length: 4 }, async (_, i) => {
      const formattedTime = getCurrentTime(i);
      const fetchData = await fetchKISMinChart(symbol, formattedTime);

      return fetchData.output2.map((item: KISStockChartItem) => ({
        stckBsopDate: item.stck_bsop_date,
        stckOprc: item.stck_oprc,
        stckHgpr: item.stck_hgpr,
        stckLwpr: item.stck_lwpr,
        stckCntgHour: item.stck_cntg_hour,
        stckPrpr: item.stck_prpr,
      }));
    });

    const results = await Promise.all(requests);
    return results.flat();
  }
}
