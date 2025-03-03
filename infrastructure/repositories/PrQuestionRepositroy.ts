import { prisma } from "@/config/prismaClient";
import { IQuestionRepository } from "@/domain/repositories/IQuestionRepository";
import { Prisma, Question } from "@prisma/client";
export class PrQuestionRepository implements IQuestionRepository {

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
   * 사용자가 이미 푼 질문 ID들을 제외한 상태에서,
   * 랜덤하게 지정한 갯수(limit)만큼 질문을 조회한다.
   * @param solvedQuestionIds - 사용자가 풀었던 질문 ID 배열
   * @param limit - 가져올 질문 수
   * @returns 랜덤으로 선택된 질문 리스트
   */
  async findRandomQuestionsByQuestionIdNotIn( solvedQuestionIds: number[], limit: number ): Promise<Question[]> {
    if (solvedQuestionIds.length > 0) {
      return await prisma.$queryRaw<Question[]>`
        SELECT * FROM "Question"
        WHERE "question_id" NOT IN (${Prisma.join(solvedQuestionIds)})
        ORDER BY RANDOM()
        LIMIT ${limit}
      `;
    } else {
      return await prisma.$queryRaw<Question[]>`
        SELECT * FROM "Question"
        ORDER BY RANDOM()
        LIMIT ${limit}
        `;
    }
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
}
