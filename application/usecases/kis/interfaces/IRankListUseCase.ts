import { RankResponseDto } from "@/application/usecases/kis/dtos/RankResponseDto";

export interface IRankListUseCase {
    execute(): Promise<RankResponseDto[]>
}