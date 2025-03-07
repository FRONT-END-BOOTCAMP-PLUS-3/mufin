import { ISaveAttemptUseCase } from "@/application/usecases/attempt/interfaces/ISaveAttemptUseCase";
import { IAttemptRepository } from "@/domain/repositories/IAttempRespository";

export class SaveAttemptUseCase implements ISaveAttemptUseCase {
    
    constructor(private readonly attemptRepository : IAttemptRepository) {}
    
    /**
   * 주어진 userId에 대해 Attempt를 저장(upsert)한다.
   * 이미 존재하면 quizDate를 업데이트하고, 없으면 새로 생성한다.
   * @param userId 사용자 ID
   * 
   */
    async execute(userId: string): Promise<void> {
        try {
            await this.attemptRepository.saveAttempt(userId);
        } catch (error){
            console.error(`Error saving attempt: ${error}`);
            throw error
        }
    }
}