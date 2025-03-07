import { CurrentPriceResponseDto } from "@/application/usecases/kis/dtos/CurrentPriceResponseDto";

export interface IGetCurrentPriceUseCase{
    execute(symbol:string) : Promise<CurrentPriceResponseDto>;
    executeGroup(symbols:string[]): Promise<CurrentPriceResponseDto[]>;
}