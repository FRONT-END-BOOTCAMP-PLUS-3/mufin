import { ISubmitQuizAnswerUseCase } from "@/application/usecases/quiz/interfaces/ISubmitQuizAnswerUseCase";
import { IRecordRepository } from "@/domain/repositories/IRecordRepository";

export class SubmitQuizAnswerUseCase implements ISubmitQuizAnswerUseCase {

    constructor (private readonly recordRepository : IRecordRepository) {}
    async execute(userId: string, questionId: number): Promise<void> {
        await this.recordRepository.saveRecord(userId, questionId);
    }

}