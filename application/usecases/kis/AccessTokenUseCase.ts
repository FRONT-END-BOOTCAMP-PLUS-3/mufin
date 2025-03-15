import { IAccessTokenUseCase } from "@/application/usecases/kis/interfaces/IAccessTokenUseCase";
import { env } from "@/config/env";
import { IRedisRepository } from "@/domain/repositories/IRedisRepository";
import { KISAuthClient } from "@/infrastructure/api/kisAuthClient";
import { RedisRepository } from "@/infrastructure/repositories/RedisRepository";

export class AccessTokenUseCase implements IAccessTokenUseCase {

    private kisAuthClient : KISAuthClient
    private redisRepository : IRedisRepository

    constructor() {
        this.kisAuthClient = new KISAuthClient();
        this.redisRepository = new RedisRepository(); 
    }
    
    async execute(): Promise<string> {
        const apiKey = env.KIS_APP_KEY_1;

        // Step 1: Redis에서 KIS_AccessToken 조회
        let kisAccessToken = await this.redisRepository.findKISAccessToken("kis_access_token", apiKey);
        
        if (kisAccessToken) {
            return kisAccessToken;
        }

        kisAccessToken = await this.kisAuthClient.getAccessToken();

        await this.redisRepository.saveKISAccessToken("kis_access_token",apiKey, kisAccessToken);

        return kisAccessToken;
    }
    async renewAccessToken(): Promise<string> {
        const apiKey = env.KIS_APP_KEY_1;
        const newToken = await this.kisAuthClient.getAccessToken();
        await this.redisRepository.saveKISAccessToken("kis_access_token", apiKey, newToken);
        return newToken;
      }
}