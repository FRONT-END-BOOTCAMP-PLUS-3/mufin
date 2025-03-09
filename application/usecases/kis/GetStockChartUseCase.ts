import { IGetStockChartUseCase } from "@/application/usecases/kis/interfaces/IGetStockChartUseCase";
import { StockChartDto } from "@/application/usecases/kis/dtos/StockChartDto";
import { IStockInfoUseCase } from "@/application/usecases/stock/interfaces/IStockInfoUseCase";
import { fetchKISStockChart } from "@/infrastructure/api/kisApiClient";

export interface KISStockChartProps {
    stck_bsop_date: string;
    stck_oprc: string;
    stck_hgpr: string;
    stck_lwpr: string;
    stck_clpr: string;
}
export class GetStockChartUseCase implements IGetStockChartUseCase {
    constructor(
        private readonly stockInfoUseCase: IStockInfoUseCase
    ) {}

    /**
   * 주어진 symbol과 activePeriod를 기반으로 KIS API로부터 주식 차트 데이터를 조회합니다.
   * @param symbol 주식 종목 코드
   * @param activePeriod 차트 조회 기간 (기본값 "D")
   * @returns 조회된 차트 데이터
   * @throws Error 상장일 정보가 없으면 에러 발생
   * @throws Error 외부 api 데이터가 없으면 에러 발생
   */

    async execute(symbol: string, activePeriod: string = "D"): Promise<StockChartDto[]> {
        
        // 상장일 가져오기 위한 usecase동작
        const stockData = await this.stockInfoUseCase.getStockInfoByCode(symbol);

        // 상장일 usecase
        if (!stockData || !stockData.stockOpen) {
            throw new Error("상장일 정보를 찾을 수 없습니다.");
        }

        // 현재 날짜 string으로 가져오기 ex)20250309
        const currentDate = new Date().toISOString().slice(0, 10).replace(/-/g, "");
        
        // 외부 api호출하기
        const fetchData = await fetchKISStockChart(
            symbol,
            stockData.stockOpen,
            currentDate,
            activePeriod
        );

        // 원하는 형태의 데이터로 파싱 작업
        return fetchData.output2.map((props: KISStockChartProps) => ({
            stckBsopDate: props.stck_bsop_date,
            stckOprc: props.stck_oprc,
            stckHgpr: props.stck_hgpr,
            stckLwpr: props.stck_lwpr,
            stckClpr: props.stck_clpr,
        }));
    }
}
