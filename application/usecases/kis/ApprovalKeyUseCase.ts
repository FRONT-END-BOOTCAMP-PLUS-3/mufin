import { IApprovalKeyUseCase } from "@/application/usecases/kis/interfaces/IApprovalKeyUseCase";
import { env } from "@/config/env";
import { IRedisRepository } from "@/domain/repositories/IRedisRepository";
import { KISAuthClient } from "@/infrastructure/api/kisAuthClinet";
import { RedisRepository } from "@/infrastructure/repositories/RedisRepository";
import { ApprovalKeyType } from "@/types/approvalKeyType";

export class ApprovalKeyUseCase implements IApprovalKeyUseCase{

    private kisAuthClient: KISAuthClient;
    private redisRepository: IRedisRepository;

    constructor () {
        this.kisAuthClient = new KISAuthClient();
        this.redisRepository = new RedisRepository(); // RedisRepository is injected here
    }
    async execute(type:ApprovalKeyType): Promise<string> {
        const apiKey =
      type === "currentPrice" ? env.KIS_APP_KEY :  env.ORDER_BOOK_KIS_API_KEY;
        let approvalKey = await this.redisRepository.findKISValue("kis_approval_key",apiKey);
        if(approvalKey) {
            return approvalKey;
        }

        approvalKey = await this.kisAuthClient.getApprovalKey();

        if(approvalKey) {
            await this.redisRepository.saveKISValue('kis_approval_key',apiKey, approvalKey);
        }

        return approvalKey;
    }
}