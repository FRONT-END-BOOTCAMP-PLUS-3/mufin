import { CheckRankResponseDto } from "@/application/usecases/kis/dtos/CheckRankResponseDto";

export interface IGetCheckRankUseCase {
    execute(): Promise<CheckRankResponseDto[]>
}