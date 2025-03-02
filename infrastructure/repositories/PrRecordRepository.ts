import { prisma } from "@/config/prismaClient";
import { IRecordRepository } from "@/domain/repositories/IRecordRepository";

export class PrRecordRepository implements IRecordRepository {
  async saveRecord(userId: string, questionId: number): Promise<void> {
    await prisma.record.upsert({
        
      where: { userId_questionId: { userId, questionId } },
      update: { recordCount: { increment: 1 } },
      create: { userId, questionId, recordCount: 1 },
    });
  }
}
