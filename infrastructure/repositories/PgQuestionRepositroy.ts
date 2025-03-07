import { Question as QuestionEntity } from '@/domain/entities/Question';
import { prisma } from "@/config/prismaClient";
import { IQuestionRepository } from "@/domain/repositories/IQuestionRepository";
import { Prisma, Question } from "@prisma/client";

interface RawQuestion {
  question_id:number;
  question_text: string;
  answer: number;
}

export class PgQuestionRepository implements IQuestionRepository {

  /**
   * 질문 생성
   * @param questionData - 질문 텍스트 및 정답 정보
   * @returns 생성된 Question 객체
   */
  async create(questionData: { questionText: string; answer: number; }): Promise<Question> {
    return await prisma.question.create({
      data: questionData,
    });
  }

  /**
   * 주어진 questionId로 질문을 조회한다.
   * @param questionId - 조회할 질문의 ID
   * @returns 질문 객체 또는 null
   */
  async findByQuestionId(questionId: string): Promise<Question | null> {
    return await prisma.question.findUnique({
      where: { questionId: parseInt(questionId) },
    });
  }

  /**
   * 전체 질문 목록 조회
   * @returns Question 객체 배열
   */
  async findAll(): Promise<Question[]> {
    return await prisma.question.findMany();
  }

  /**
   * 질문 업데이트
   * @param questionId - 업데이트할 질문의 ID
   * @param updateData - 업데이트할 데이터 (질문 텍스트, 정답 등)
   * @returns 업데이트된 Question 객체
   */
  async update(questionId: number, updateData: Partial<{ questionText: string; answer: number; }>): Promise<Question> {
    return await prisma.question.update({
      where: { questionId },
      data: updateData,
    });
  }

  /**
   * 질문 삭제
   * @param questionId - 삭제할 질문의 ID
   * @returns 삭제된 Question 객체
   */
  async delete(questionId: number): Promise<Question> {
    return await prisma.question.delete({
      where: { questionId },
    });
  }

    /**
   * 사용자가 이미 푼 질문 ID들을 제외한 상태에서,
   * 랜덤하게 지정한 갯수(limit)만큼 질문을 조회한다.
   * @param solvedQuestionIds - 사용자가 풀었던 질문 ID 배열
   * @param limit - 가져올 질문 수
   * @returns 랜덤으로 선택된 질문 리스트
   */
    async  findRandomQuestionsByQuestionIdNotIn(
      userId: string, solvedQuestionIds: number[], limit: number
    ): Promise<QuestionEntity[]> {

      // unsolved 질문을 먼저 조회
      let unsolvedQuestions: RawQuestion[] = [];

      if (solvedQuestionIds.length > 0) {
        unsolvedQuestions = await prisma.$queryRaw<RawQuestion[]>`
          SELECT question_id, question_text, answer FROM "Question"
          WHERE "question_id" NOT IN (${Prisma.join(solvedQuestionIds)})
          ORDER BY RANDOM()
          LIMIT ${limit}
        `;
      } else {
        unsolvedQuestions = await prisma.$queryRaw<RawQuestion[]>`
          SELECT question_id, question_text, answer FROM "Question"
          ORDER BY RANDOM()
          LIMIT ${limit}
        `;
      }
  
      // unsolvedQuestions가 limit보다 작으면, fallback 로직 적용:
      // 사용자가 풀었던 질문 중 recordCount가 낮은 순으로 추가 조회
      if (unsolvedQuestions.length < limit) {
        const remaining = limit - unsolvedQuestions.length;
        const fallbackQuestions: RawQuestion[] = await prisma.$queryRaw<RawQuestion[]>`
          SELECT q.question_id, q.question_text, q.answer
          FROM "Question" q
          INNER JOIN "Record" r ON q."question_id" = r."question_id"
          WHERE r."user_id" = ${userId}
          ORDER BY r."recordCount" ASC, RANDOM()
          LIMIT ${remaining}
        `;
        unsolvedQuestions = unsolvedQuestions.concat(fallbackQuestions);
      }
      return unsolvedQuestions.map((q): QuestionEntity => ({
        questionId: q.question_id,
        questionText: q.question_text,
        answer: q.answer,
      }));
  }
}
