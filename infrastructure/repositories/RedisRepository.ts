import redisClient from "@/infrastructure/redis/redisClient";
import { IRedisRepository } from "@/domain/repositories/IRedisRepository";

import { ApprovalKeyEntity } from "@/domain/entities/ApprovalKeyEntity";

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

  async saveKISApprovalKeyData(prefix: string, apiKey: string, data: ApprovalKeyEntity): Promise<void> {
    const key = this.getKey(prefix, apiKey);
    const snakeData = {
      approval_key: data.approvalKey,
      in_use: data.inUse,
    }
    await redisClient.setex(key, this.ttl, JSON.stringify(snakeData));
  }

  async findKISApprovalKeyData(prefix: string, apiKey: string): Promise<ApprovalKeyEntity | null> {
    const key = this.getKey(prefix, apiKey);
    const result = await redisClient.get(key);

    if (result) {
      const parsed = JSON.parse(result);
      return {
        approvalKey: parsed.approval_key,
        inUse: parsed.in_use,
      };
    }
    return null;
  }

  async updateInUseWithoutResetTTL(prefix: string, apiKey: string,  newInUse: boolean): Promise<string | null> {
    const key = this.getKey(prefix, apiKey);
    const luaScript = `
      local key = KEYS[1]
      local newInUse = ARGV[1]
      local val = redis.call("GET", key)
      if not val then return nil end
      local data = cjson.decode(val)
      data.in_use = (newInUse == "true")
      local newVal = cjson.encode(data)
      local ttl = redis.call("TTL", key)
      if ttl > 0 then
        redis.call("SET", key, newVal, "EX", ttl)
      else
        redis.call("SET", key, newVal)
      end
      return newVal
    `;
    const result = await redisClient.eval(luaScript, 1, key, newInUse.toString())as string | null;
    return result;
  }


  async deleteKISApprovalKeyData(prefix: string, apiKey: string): Promise<void> {
    const key = this.getKey(prefix, apiKey);
    await redisClient.del(key);
  }

  async saveKISAccessToken(prefix: string, apiKey: string, value: string): Promise<void> {
    const key = this.getKey(prefix, apiKey);
    await redisClient.setex(key, this.ttl, value);
  }

  async findKISAccessToken(prefix: string, apiKey: string): Promise<string | null> {
    const key = this.getKey(prefix, apiKey);
    return await redisClient.get(key);
  }

  async deleteKISAccessToken(prefix: string, apiKey: string): Promise<void> {
    const key = this.getKey(prefix, apiKey);
    await redisClient.del(key);
  }
}
