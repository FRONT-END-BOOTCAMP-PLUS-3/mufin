import { CurrentPriceResponseDto } from "@/application/usecases/kis/dtos/CurrentPriceResponseDto";
import { fetchKISPrice } from "@/infrastructure/api/kisApiClient";
import { IGetCurrentPriceUseCase } from "@/application/usecases/kis/interfaces/IGetCurrentPriceUseCase";

export class GetCurrentPriceUseCase implements IGetCurrentPriceUseCase {

    /**
     * 주식 종목 코드로 현재가 정보 조회
     * 
     * @param stockCode - 조회할 종목의 코드 (예: '005930' 삼성전자)
     * @returns 성공 시 stckPrpr(현재가), prdyVrss(전날 대비), prdyCtrt(전날 대비율) 반환
     *  데이터가 없으면 null 반환
     */
    async execute(stockCode:string): Promise<CurrentPriceResponseDto | null> {
        
        // infrastructure 계층의 외부 api호출 하기
        const rawData = await fetchKISPrice(stockCode);

        // api데이터가 없을 때 null반환
        if(!rawData) return null;

        // 데이터가 있을 시 dto로 변환하여 반환
        return {
            stckPrpr: rawData.output.stck_prpr,
            prdyVrss: rawData.output.prdy_vrss,
            prdyCtrt: rawData.output.prdy_ctrt
        }
    }
}