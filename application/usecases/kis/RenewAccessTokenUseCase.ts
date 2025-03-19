import { env } from "@/config/env";
import { IRedisRepository } from "@/domain/repositories/IRedisRepository";
import { KISAuthClient } from "@/infrastructure/api/kisAuthClient";
import { IRenewAccessToken } from "@/application/usecases/kis/interfaces/IRenewAccessTokenUseCase";

export class RenewAccessToken implements IRenewAccessToken{

    constructor(
        private readonly kisAuthClient:KISAuthClient,
        private readonly redisRepository: IRedisRepository,
    ){}    
  async execute(): Promise<string> {
    const apiKey = env.KIS_APP_KEY_1;
    const newToken = await this.kisAuthClient.getAccessToken();
    await this.redisRepository.saveKISAccessToken("kis_access_token", apiKey, newToken);
    return newToken;
  }
}
