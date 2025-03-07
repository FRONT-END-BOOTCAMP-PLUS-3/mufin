import { prisma } from "@/config/prismaClient";
import { IChoiceRepository } from "@/domain/repositories/IChoiceRepository";
import { Choice } from "@prisma/client";

export class PgChoiceRepository implements IChoiceRepository {

  /**
   * 선택지 생성
   * @param choiceData - questionId, 선택지 텍스트, 선택 번호 등
   * @returns 생성된 Choice 객체
   */
  async createChoice(choiceData: { questionId: number; choiceText: string; choiceNumber: number; }): Promise<Choice> {
    return await prisma.choice.create({
      data: choiceData,
    });
  }

  /**
   * 특정 문제의 모든 선택지 조회
   * @param questionId 문제 ID
   * @returns 해당 질문의 대한 선택지 리스트
   */
  async findChoicesByQuestionId(questionId: number): Promise<Choice[]> {
    return await prisma.choice.findMany({
      where: { questionId },
    });
  }

  /**
   * 선택지 업데이트
   * @param choiceId - 업데이트할 선택지의 ID
   * @param updateData - 업데이트할 데이터 (선택지 텍스트, 선택 번호 등)
   * @returns 업데이트된 Choice 객체
   */
  async update(choiceId: number, updateData: Partial<{ choiceText: string; choiceNumber: number }>): Promise<Choice> {
    return prisma.choice.update({
      where: { choiceId },
      data: updateData,
    });
  }

  /**
   * 선택지 삭제
   * @param choiceId - 삭제할 선택지의 ID
   * @returns 삭제된 Choice 객체
   */
  async delete(choiceId: number): Promise<Choice> {
    return prisma.choice.delete({
      where: { choiceId },
    });
  }
}
