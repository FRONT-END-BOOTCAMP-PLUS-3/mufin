import { IAccessTokenUseCase } from "@/application/usecases/kis/interfaces/IAccessTokenUseCase";
import { env } from "@/config/env";
import { IRedisRepository } from "@/domain/repositories/IRedisRepository";
import { KISAuthClient } from "@/infrastructure/api/kisAuthClient";

export class AccessTokenUseCase implements IAccessTokenUseCase {

    constructor(
        private readonly kisAuthClient: KISAuthClient, 
        private readonly redisRepository: IRedisRepository
    ) {}
    
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
}