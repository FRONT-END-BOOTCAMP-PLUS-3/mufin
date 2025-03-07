import { CurrentPriceResponseDto } from "@/application/usecases/kis/dtos/CurrentPriceResponseDto";

export interface IGetCurrentPriceUseCase{
    execute(stockCode:string) : Promise<CurrentPriceResponseDto | null>;
}