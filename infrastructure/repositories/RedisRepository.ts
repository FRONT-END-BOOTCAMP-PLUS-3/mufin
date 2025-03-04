import { IRedisRepository } from '@/domain/repositories/IRedisRepository';
import  redisClient  from "@/infrastructure/redis/redisClient";

// TTL 설정 (24시간 = 86400초)
const TTL = 86400;

export class RedisRepository implements IRedisRepository {
  // API Key를 기반으로 Approval Key 저장
  async setApprovalKey(apiKey: string, approvalKey: string): Promise<void> {
    const key = `approval_key:${apiKey}`;
    await redisClient.setex(key, TTL, approvalKey);
  }

  // API Key로 Approval Key 조회
  async getApprovalKey(apiKey: string): Promise<string | null> {
    const key = `approval_key:${apiKey}`;
    return await redisClient.get(key);
  }

  // API Key로 Approval Key 삭제
  async deleteApprovalKey(apiKey: string): Promise<void> {
    const key = `approval_key:${apiKey}`;
    await redisClient.del(key);
  }

  async setKISAccessToken(apiKey: string, kISAccessToken:string): Promise<void> {
    const key = `kis_access_token:${apiKey}`;
    await redisClient.setex(key, TTL, kISAccessToken);
  }

  async getKISAccessToken(apiKey: string): Promise<string | null> {
    const key = `kis_access_token:${apiKey}`;
    return await redisClient.get(key);
  }

  async deleteKISAccessToken(apiKey: string): Promise<void> {
    const key = `kis_access_token:${apiKey}`;
    await redisClient.del(key);
  }
}