import { IQuestionRepository } from "@/domain/repositories/IQuestionRepository";
import { IGetRandomQuestionUseCase } from "@/application/usecases/quiz/interfaces/IGetRandomQuestionUseCase";
import { ResponseQuizDto } from "@/application/usecases/quiz/dtos/ResponseQuizDto";
import { IChoiceRepository } from "@/domain/repositories/IChoiceRepository";
import { IRecordRepository } from "@/domain/repositories/IRecordRepository";

export class GetRandomQuestionUseCase implements IGetRandomQuestionUseCase {
  constructor(
    private readonly questionRepository: IQuestionRepository,
    private readonly recordRepository: IRecordRepository,
    private readonly choiceRepository: IChoiceRepository
  ) {}

  /**
   * 사용자에게 추천할 질문과 선택지를 반환한다.
   * @param userId 사용자 ID
   * @param limit 조회할 질문 개수 (기본값 5)
   * @returns 추천 질문 및 선택지 DTO 목록
   */
  async execute(userId: string, limit: number = 5): Promise<{totalQuestions: number; questions:ResponseQuizDto[]}> {
    // 사용자가 푼 문제 조회
    const recordsCount = await this.recordRepository.findRecordCountByUserId(
      userId
    );
    const solvedQuestionIds = Object.keys(recordsCount).map(Number);

    // 사용자가 풀지 않은 질문 랜덤 조회
    const questions =
      await this.questionRepository.findRandomQuestionsByQuestionIdNotIn(
        userId,
        solvedQuestionIds,
        limit
      );

    // 각 질문에 따른 선택지 조회하여 dto로 변환
    const questionDtos: ResponseQuizDto[] = await Promise.all(
      questions.map(async (question, index) => {
        const choices = await this.choiceRepository.findChoicesByQuestionId(
          question.questionId
        );

        return {
          index: index + 1,
          questionId: question.questionId,
          questionText: question.questionText,
          answer: question.answer,
          choices: choices.map((choice) => ({
            choiceId: choice.choiceId,
            choiceText: choice.choiceText,
            choiceNumber: choice.choiceNumber,
          })),
        };
      })
    );
    return {totalQuestions: questions.length, questions: questionDtos};
  }
}
