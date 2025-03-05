import { prisma } from "@/config/prismaClient";
import { IRecordRepository } from "@/domain/repositories/IRecordRepository";

export class PgRecordRepository implements IRecordRepository {
   
  /**
   * 주어진 사용자 ID에 대해, 각 질문의 풀이 횟수(recordCount)를 조회한다.
   * @param userId - 사용자 ID
   * @returns {Promise<Record<number, number>>} 예시: { questionId: recordCount, ... }
   */
  async findRecordCountByUserId(userId: string): Promise<Record<number, number>> {
   
    const records = await prisma.record.findMany({
      where: {userId},
      select: {
        questionId: true,
        recordCount: true,
      }
    });

    return records.reduce((acc, record) => {
      acc[record.questionId] = record.recordCount;
      return acc;
    }, {} as Record<number, number>)
  }
  
  /**
   * 주어진 사용자 ID, 문제 ID로, recordCount를 1씩 증가시킨다.
   * @param userId - 사용자 ID
   * @param questionId - 문제 ID
   */
  async saveRecord(userId: string, questionId: number): Promise<void> {
    await prisma.record.upsert({
        
      where: { userId_questionId: { userId, questionId } },
      update: { recordCount: { increment: 1 } },
      create: { userId, questionId, recordCount: 1 },
    });
  }
}
