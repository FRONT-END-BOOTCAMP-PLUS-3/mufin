import { IReleaseApprovalKeyUseCase } from "@/application/usecases/kis/interfaces/IReleaseApprovalKeyUseCase";
import { env } from "@/config/env";
import { IRedisRepository } from "@/domain/repositories/IRedisRepository";
import { RedisRepository } from "@/infrastructure/repositories/RedisRepository";
import { ApprovalKeyType } from "@/types/approvalKeyType";

export class ReleaseApprovalKeyUseCase implements IReleaseApprovalKeyUseCase {
    
    private redisRepository: IRedisRepository;

    constructor() {
      this.redisRepository = new RedisRepository(); 
    }  
    
    async execute(type: ApprovalKeyType, usedApiKeyName: string): Promise<void> {
        const prefix = "kis_approval_key";
        let apiKey: string | undefined;

        // type에 따라 usedApiKeyName에 해당하는 실제 API 키 값을 선택합니다.
        if (type === "currentPrice") {
            if (usedApiKeyName === "KIS_APP_KEY_1") apiKey = env.KIS_APP_KEY_1;
            else if (usedApiKeyName === "KIS_APP_KEY_2") apiKey = env.KIS_APP_KEY_2;
            //   else if (usedApiKeyName === "KIS_APP_KEY_3") apiKey = env.KIS_APP_KEY_3;
        } else {
            if (usedApiKeyName === "ORDER_BOOK_KIS_API_KEY_1") apiKey = env.ORDER_BOOK_KIS_API_KEY_1;
            else if (usedApiKeyName === "ORDER_BOOK_KIS_API_KEY_2") apiKey = env.ORDER_BOOK_KIS_API_KEY_2;
             //   else if (usedApiKeyName === "ORDER_BOOK_KIS_API_KEY_3") apiKey = env.ORDER_BOOK_KIS_API_KEY_3;
    }

    if (!apiKey) {
      throw new Error("유효한 API 키 이름이 아닙니다.");
    }

    // 선택된 API 키에 대해 in_use값을 false로 업데이트
    await this.redisRepository.updateInUseWithoutResetTTL(prefix, apiKey, false);
  }
}
