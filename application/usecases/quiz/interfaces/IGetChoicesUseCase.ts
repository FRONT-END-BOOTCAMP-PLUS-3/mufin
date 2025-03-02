import { ChoiceDto } from "@/application/usecases/quiz/dtos/ChoiceDto";

export interface IGetChoicesUseCase {
    execute(questionId: number): Promise<ChoiceDto[]>
}