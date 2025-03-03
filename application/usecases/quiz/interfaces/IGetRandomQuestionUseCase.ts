import { QuestionDto } from "@/application/usecases/quiz/dtos/QuestionDto";

export interface IGetRandomQuestionUseCase {
    execute(userId: string, limit :number) :Promise<QuestionDto[]> ;
}