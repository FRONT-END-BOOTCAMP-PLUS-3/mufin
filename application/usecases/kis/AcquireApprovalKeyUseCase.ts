import { env } from "@/config/env";

import { ApprovalKeyEntity } from "@/domain/entities/ApprovalKeyEntity";
import { IRedisRepository } from "@/domain/repositories/IRedisRepository";

import { IAcquireApprovalKeyUsecase } from "@/application/usecases/kis/interfaces/IAcquireApprovalKeyUseCase";

import { KISAuthClient } from "@/infrastructure/api/kisAuthClient";
import { RedisRepository } from "@/infrastructure/repositories/RedisRepository";

import { ApprovalKeyType } from "@/types/approvalKeyType";

// 승인키와 함께 실제로 사용된 API 키를 반환하는 인터페이스
export interface ApprovalKeyResult {
    approvalKey: string;
    usedApiKeyName: string;
}

export class AcquireApprovalKeyUseCase implements IAcquireApprovalKeyUsecase {
    private kisAuthClient: KISAuthClient;
    private redisRepository: IRedisRepository;

    constructor() {
        this.kisAuthClient = new KISAuthClient();
        this.redisRepository = new RedisRepository(); 
    }

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
        const prefix = "kis_approval_key";
        let apiKeysMapping: {name: string; value: string}[] = [];

        // 실시간 체결가 및 호가 종류에 따른 사용하는 api Key 배열
        if (type === "currentPrice") {
            apiKeysMapping = [
                { name: "KIS_APP_KEY_3", value: env.KIS_APP_KEY_1 },
                { name: "KIS_APP_KEY_2", value: env.KIS_APP_KEY_2 }, 
                // {name: "KIS_APP_KEY_3", value: env.KIS_APP_KEY_3},
            ];
        } else {
            apiKeysMapping = [
                { name: "ORDER_BOOK_KIS_API_KEY_1", value: env.ORDER_BOOK_KIS_API_KEY_1 },
                { name: "ORDER_BOOK_KIS_API_KEY_2", value: env.ORDER_BOOK_KIS_API_KEY_2 }, 
                // {name: "ORDER_BOOK_KIS_API_KEY_3", value: env.ORDER_BOOK_KIS_API_KEY_3},
            ];
        }

        // 각 API 키에 대해 Redis에 저장된 승인키 데이터를 순차적으로 확인합니다.
        for (const apiKeyObj of apiKeysMapping) {
            
            const apiKey = apiKeyObj.value;
            
            // Redis에서 해당 API 키에 대한 승인키 데이터 조회
            const approvalData = await this.redisRepository.findKISApprovalKeyData(prefix, apiKey);
            
            if (approvalData) {
                
                // 승인 키 데이터가 있지만 사용 중이 아닐 경우
                if (!approvalData.inUse) {
                    await this.redisRepository.updateInUseWithoutResetTTL(prefix, apiKey, true);
                    
                    // 업데이트 후 승인키와 사용된 API 키 정보를 반환합니다.
                    return { approvalKey: approvalData.approvalKey, usedApiKeyName: apiKeyObj.name };
                }
            // 승인키가 데이터에 없을 경우
            } else {
                
                // 외부 api 에서 approvalKey 가져오기
                const approvalKey = await this.kisAuthClient.getApprovalKey();
                
                // approvalKey 가져오기 성공시 Redis 에 저장
                if (approvalKey) {
                    const newApprovalData: ApprovalKeyEntity = { approvalKey, inUse: true };
                    
                    // Redis에 새로운 접속키 저장
                    await this.redisRepository.saveKISApprovalKeyData(prefix, apiKey, newApprovalData);

                    return { approvalKey, usedApiKeyName: apiKeyObj.name };
                }   
            }
        }
        throw new Error("모든 API 키가 사용 중입니다.");
    }
}
