import { IRedisRepository } from "@/domain/repositories/IRedisRepository";
import { ApprovalKeyEntity } from "@/domain/entities/ApprovalKeyEntity";

import { IAcquireApprovalKeyUseCase } from "@/application/usecases/kis/interfaces/IAcquireApprovalKeyUseCase";

import { KISAuthClient } from "@/infrastructure/api/kisAuthClient";

import { ApprovalKeyType } from "@/types/approvalKeyType";
import { KIS_API_KEYS } from "@/config/apiKeys";

// 승인키와 함께 실제로 사용된 API 키를 반환하는 인터페이스
export interface ApprovalKeyResult {
  approvalKey: string;
  usedApiKeyName: string;
}

export class AcquireApprovalKeyUseCase implements IAcquireApprovalKeyUseCase {

  constructor(
    private readonly kisAuthClient: KISAuthClient,
    private readonly redisRepository: IRedisRepository
  ) {}

  /**
   * 승인키를 할당하는 메서드
   * - 여러 API 키 중에서 사용 가능한 키를 찾아, 해당 키의 in_use 상태를 업데이트한 후 승인키를 반환합니다.
   * - 만약 해당 API 키에 대해 승인키 데이터가 없다면 외부 API에서 새 승인키를 발급받아 저장합니다.
   *
   * @param type "currentPrice" 또는 "orderBook"에 따라 사용할 API 키 집합을 선택합니다.
   * @returns {ApprovalKeyResult} 승인키와 실제로 사용된 API 키 정보
   * @throws 모든 API 키가 사용 중인 경우 에러를 발생시킵니다.
   */
  async execute(type: ApprovalKeyType): Promise<ApprovalKeyResult> {
    let apiKeysMapping: { name: string; appKey: string; secretKey: string }[] =
      [];

    // 실시간 체결가 및 호가 종류에 따른 사용하는 api Key 배열
    if (type === "currentPrice") {
      apiKeysMapping = KIS_API_KEYS.currentPrice;
    } else if (type === "orderBook") {
      apiKeysMapping = KIS_API_KEYS.orderBook;
    }

    // 각 API 키에 대해 Redis에 저장된 승인키 데이터를 순차적으로 확인합니다.
    for (const apiKeyObj of apiKeysMapping) {
      const apiKey = apiKeyObj.appKey;
      const prefix = apiKeyObj.name;

      // Redis에서 해당 API 키에 대한 승인키 데이터 조회
      const approvalData = await this.redisRepository.findKISApprovalKeyData(
        apiKeyObj.name,
        apiKey
      );

      if (approvalData && !approvalData.inUse) {
        // 승인 키 데이터가 있지만 사용 중이 아닐 경우
        await this.redisRepository.updateInUseWithoutResetTTL(prefix, apiKey, true);
        return { approvalKey: approvalData.approvalKey,usedApiKeyName: apiKeyObj.name };

        // 승인키가 데이터에 없을 경우
      } else if (approvalData && approvalData.inUse) {
        continue;
      } else {
        // 외부 api 에서 approvalKey 가져오기
        const approvalKey = await this.kisAuthClient.getApprovalKey(
          apiKeyObj.appKey,
          apiKeyObj.secretKey,
          type
        );

        // approvalKey 가져오기 성공시 Redis 에 저장
        if (approvalKey) {
          const newApprovalData: ApprovalKeyEntity = {
            approvalKey,
            inUse: true,
          };
          await this.redisRepository.saveKISApprovalKeyData(
            apiKeyObj.name,
            apiKey,
            newApprovalData
          );
          return { approvalKey, usedApiKeyName: apiKeyObj.name };
        }
      }
    }
    return { approvalKey: "", usedApiKeyName: "" }; // 기본값으로 빈 값을 반환
  }
}
