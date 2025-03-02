import { QuestionDto } from "@/application/usecases/quiz/dtos/QuestionDto";

export interface IGetQuestionUseCase {
    execute(questionId: number) :Promise<QuestionDto | null> ;
}