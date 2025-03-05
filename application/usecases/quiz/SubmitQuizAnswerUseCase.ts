import { ISubmitQuizAnswerUseCase } from "@/application/usecases/quiz/interfaces/ISubmitQuizAnswerUseCase";
import { IRecordRepository } from "@/domain/repositories/IRecordRepository";
import { IWalletRepository } from "@/domain/repositories/IWalletRepository";

export class SubmitQuizAnswerUseCase implements ISubmitQuizAnswerUseCase {

    constructor (
        private readonly recordRepository : IRecordRepository,
        private readonly walletRepository : IWalletRepository
    ) {}
    async execute(userId: string, questionId: number, reword:number): Promise<void> {
        await this.recordRepository.saveRecord(userId, questionId);

        await this.walletRepository.updateAccountByUserId(userId, reword)
    }

}