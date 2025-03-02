import { IQuestionRepository } from '@/domain/repositories/IQuestionRepository';
import { IGetChoicesUseCase } from '@/application/usecases/quiz/interfaces/IGetChoicesUseCase';
import { IGetQuestionUseCase } from '@/application/usecases/quiz/interfaces/IGetQuestionUseCase';
import { QuestionDto } from '@/application/usecases/quiz/dtos/QuestionDto';

export class GetQuestionUseCase implements IGetQuestionUseCase {
    constructor(
        private readonly questionRepository: IQuestionRepository,
        private readonly getChoicesUseCase: IGetChoicesUseCase
    ){}
    async execute(questionId: number): Promise<QuestionDto | null>  {
        const question = await this.questionRepository.findQuestionById(questionId);
        if (!question) 
            return null;
        
        const choices = await this.getChoicesUseCase.execute(questionId);

        return {
            questionId: question.questionId,
            questionText: question.questionText,
            answer: question.answer,
            choices,
        }
    }

} 