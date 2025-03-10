import { IRedisRepository } from "@/domain/repositories/IRedisRepository";
import redisClient from "@/infrastructure/redis/redisClient";

// TTL 설정 (24시간 = 86400초)
const DEFAULT_TTL = 86400;

export class RedisRepository implements IRedisRepository {
  private ttl: number;

  constructor(ttl: number = DEFAULT_TTL) {
    this.ttl = ttl;
  }

  getKey(prefix: string, apiKey: string): string {
    return `${prefix}:${apiKey}`;
  }

  async saveKISValue(prefix: string, apiKey: string, value: string): Promise<void> {
    const key = this.getKey(prefix, apiKey);
    await redisClient.setex(key, this.ttl, value);
  }

  async findKISValue(prefix: string, apiKey: string): Promise<string | null> {
    const key = this.getKey(prefix, apiKey);
    return await redisClient.get(key);
  }

  async deleteKISValue(prefix: string, apiKey: string): Promise<void> {
    const key = this.getKey(prefix, apiKey);
    await redisClient.del(key);
  }
}
