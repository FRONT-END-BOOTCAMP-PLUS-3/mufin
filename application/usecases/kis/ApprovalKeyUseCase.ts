import { IApprovalKeyUseCase } from "@/application/usecases/kis/interfaces/IApprovalKeyUseCase";
import { env } from "@/config/env";
import { IRedisRepository } from "@/domain/repositories/IRedisRepository";
import { KISAuthClient } from "@/infrastructure/api/kisAuthClinet";
import { RedisRepository } from "@/infrastructure/repositories/RedisRepository";

export class ApprovalKeyUseCase implements IApprovalKeyUseCase{

    private kisAuthClient: KISAuthClient;
    private redisRepository: IRedisRepository;

    constructor () {
        this.kisAuthClient = new KISAuthClient();
        this.redisRepository = new RedisRepository(); // RedisRepository is injected here
    }
    async execute(): Promise<string> {
        const apiKey = env.KIS_APP_KEY;

        let approvalKey = await this.redisRepository.getApprovalKey(apiKey);
        if(approvalKey) {
            console.log(`[CACHE HIT] Redis에서 Approval Key 가져��: ${approvalKey}`);
            return approvalKey;
        }

        approvalKey = await this.kisAuthClient.getApprovalKey();

        if(approvalKey) {
            await this.redisRepository.setApprovalKey(apiKey, approvalKey);
            console.log("[CACHE UPDATE] Approval Key 저장 완료!");
        }

        return approvalKey;
    }
}