import { ResponseQuizDto } from "@/application/usecases/quiz/dtos/ResponseQuizDto";

export interface IGetRandomQuestionUseCase {
    execute(userId: string, limit :number) :Promise<{totalQuestions:number; questions:ResponseQuizDto[]}> ;
}