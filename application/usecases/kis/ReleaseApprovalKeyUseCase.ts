import { IReleaseApprovalKeyUseCase } from "@/application/usecases/kis/interfaces/IReleaseApprovalKeyUseCase";
import { KIS_API_KEYS } from "@/config/apiKeys";
import { IRedisRepository } from "@/domain/repositories/IRedisRepository";
import { RedisRepository } from "@/infrastructure/repositories/RedisRepository";
import { ApprovalKeyType } from "@/types/approvalKeyType";

export class ReleaseApprovalKeyUseCase implements IReleaseApprovalKeyUseCase {
  private redisRepository: IRedisRepository;

  constructor() {
    this.redisRepository = new RedisRepository();
  }

  private getApiKey(type: ApprovalKeyType, usedApiKeyName: string): { prefix: string, apiKey: string } {

    // type에 따른 API 키 배열을 선택합니다.
    const apiKeyArray = type === "currentPrice" ? KIS_API_KEYS.currentPrice : type === "orderBook" ? KIS_API_KEYS.orderBook : null;

    if (!apiKeyArray) {
      throw new Error("지원되지 않는 API 타입입니다.");
    }

    // 해당 API 키 배열에서 usedApiKeyName에 맞는 객체를 찾습니다.
   const apiKeyObj = apiKeyArray.find((apiKey) => apiKey.name === usedApiKeyName);

    if (!apiKeyObj) {
      throw new Error(`유효한 ${type} API 키 이름이 아닙니다.`);
    }

    return { prefix: apiKeyObj.name, apiKey: apiKeyObj.appKey };
  }

  async execute(type: ApprovalKeyType, usedApiKeyName: string): Promise<void> {

    const { prefix, apiKey } = this.getApiKey(type, usedApiKeyName);

    // 선택된 API 키에 대해 in_use값을 false로 업데이트
    await this.redisRepository.updateInUseWithoutResetTTL(prefix, apiKey, false);
  }
}
