import { CurrentPriceResponseDto } from "@/application/usecases/kis/dtos/CurrentPriceResponseDto";
import { fetchKISPrice } from "@/infrastructure/api/kisApiClient";
import { IGetCurrentPriceUseCase } from "@/application/usecases/kis/interfaces/IGetCurrentPriceUseCase";

export class GetCurrentPriceUseCase implements IGetCurrentPriceUseCase {

    async execute(symbol:string): Promise<CurrentPriceResponseDto> {
        
        // infrastructure 계층의 외부 api호출 하기
        const rawData = await fetchKISPrice(symbol);

        return {
            symbol,
            stckPrpr: rawData?.output.stck_prpr,
            prdyVrss: rawData?.output.prdy_vrss,
            prdyCtrt: rawData?.output.prdy_ctrt
        }
    }

    async executeGroup(symbols: string[]): Promise<CurrentPriceResponseDto[]> {
        return Promise.all(symbols.map(symbol=> this.execute(symbol)));
    }

}