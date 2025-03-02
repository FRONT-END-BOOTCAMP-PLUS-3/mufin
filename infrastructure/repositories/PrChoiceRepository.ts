import { prisma } from "@/config/prismaClient";
import { IChoiceRepository } from "@/domain/repositories/IChoiceRepository";
import { Choice } from "@prisma/client";

export class PChoiceRepository implements IChoiceRepository {
  
    /**
   * 새로운 선택지 생성 (매개변수가 적다면 개별 인자 방식 사용)
   * @param questionId 문제 ID
   * @param choiceText 선택지 내용
   * @param choiceNumber 선택지 번호
   * @returns 생성된 Choice 객체
   */
    // async createChoices(choices: { questionId: number; choiceText: string; choiceNumber: number }[]): Promise<boolean> {
    //     try {
    //       await prisma.choice.createMany({ data: choices });
    //       return true; // 성공
    //     } catch (error) {
    //       console.error("🚨 선택지 생성 중 오류 발생:", error);
    //       return false; // 실패
    //     }
    //   }

  /**
   * 특정 문제의 모든 선택지 조회
   * @param questionId 문제 ID
   * @returns Choice 객체 배열
   */
  async findChoicesByQuestionId(questionId: number): Promise<Choice[]> {
    return await prisma.choice.findMany({
      where: { questionId },
    });
  }

  /**
   * 선택지 수정 (부분 업데이트 가능하도록 객체 방식 사용)
   * @param choiceId 선택지 ID
   * @param updatedData 수정할 데이터 (choiceText, choiceNumber)
   * @returns 수정된 Choice 객체 또는 null
   */
//   async updateChoice(choiceId: number,updatedData: Partial<Pick<Choice, "choiceText" | "choiceNumber">>): Promise<Choice | null> {
//     return prisma.choice.update({
//       where: { choiceId },
//       data: updatedData,
//     });
//   }

  /**
   * 선택지 삭제
   * @param choiceId 선택지 ID
   * @returns 삭제된 Choice 객체 또는 null
   */
//   async deleteChoice(choiceId: number): Promise<boolean> {
//     try {
//       await prisma.choice.delete({ where: { choiceId } });
//       return true; // 삭제 성공
//     } catch (error) {
//       console.error(error);

//       return false; // 삭제 실패 (예: 존재하지 않는 ID)
//     }
//   }
}
