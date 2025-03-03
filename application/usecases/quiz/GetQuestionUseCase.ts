import { IQuestionRepository } from '@/domain/repositories/IQuestionRepository';
import { IGetRandomQuestionUseCase } from '@/application/usecases/quiz/interfaces/IGetRandomQuestionUseCase';
import { QuestionDto } from '@/application/usecases/quiz/dtos/QuestionDto';
import { IChoiceRepository } from '@/domain/repositories/IChoiceRepository';
import { IRecordRepository } from '@/domain/repositories/IRecordRepository';

export class GetRandomQuestionUseCase implements IGetRandomQuestionUseCase {
    
    constructor(
        private readonly questionRepository: IQuestionRepository,
        private readonly recordRepository : IRecordRepository,
        private readonly choiceRepository : IChoiceRepository
    ){}

    /**
   * 사용자에게 추천할 질문과 선택지를 반환한다.
   * @param userId 사용자 ID
   * @param limit 조회할 질문 개수 (기본값 5)
   * @returns 추천 질문 및 선택지 DTO 목록
   */
    async execute( userId: string , limit: number=5): Promise<QuestionDto[] >  {
        
        // 사용자가 푼 문제 조회
        const recordsCount = await this.recordRepository.findRecordCountByUserId(userId);
        const solvedQuestionIds = Object.keys(recordsCount).map(Number);

        // 사용자가 풀지 않은 질문 랜덤 조회
        const questions = await this.questionRepository.findRandomQuestionsByQuestionIdNotIn(solvedQuestionIds, limit);

        // 각 질문에 따른 선택지 조회하여 dto로 변환
        const questionDtos: QuestionDto[] = await Promise.all(
            questions.map(async (question) => {
                const choices = await this.choiceRepository.findChoicesByQuestionId(question.questionId);
                return {
                    questionId: question.questionId,
                    questionText: question.questionText,
                    answer: question.answer,
                    choices: choices
                }
            })
        );
        return questionDtos;
    }

} 