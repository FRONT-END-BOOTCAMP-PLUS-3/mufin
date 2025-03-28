import { AccessTokenUseCase } from "@/application/usecases/kis/AccessTokenUseCase";
import { AcquireApprovalKeyUseCase } from "@/application/usecases/kis/AcquireApprovalKeyUseCase";
import { GetCheckRankUseCase } from "@/application/usecases/kis/GetCheckRankUseCase";
import { GetCurrentPriceUseCase } from "@/application/usecases/kis/GetCurrentPriceUseCase";
import { GetMinChartUseCase } from "@/application/usecases/kis/GetMinChartUseCase";
import { GetOrderBookUseCase } from "@/application/usecases/kis/GetOrderBookUseCase";
import { GetStockChartUseCase } from "@/application/usecases/kis/GetStockChartUseCase";
import { ReleaseApprovalKeyUseCase } from "@/application/usecases/kis/ReleaseApprovalKeyUseCase";
import { RenewAccessToken } from "@/application/usecases/kis/RenewAccessTokenUseCase";
import { StockInfoUseCase } from "@/application/usecases/stock/StockInfoUseCase";

import { KISAuthClient } from "@/infrastructure/api/kisAuthClient";
import { PgStockRepository } from "@/infrastructure/repositories/PgStockRepository";
import { RedisRepository } from "@/infrastructure/repositories/RedisRepository";

export const kisAPIDi = {
    accessTokenUseCase: new AccessTokenUseCase(new KISAuthClient, new RedisRepository),
    renewAccessToken : new RenewAccessToken(new KISAuthClient, new RedisRepository),
    acquireApprovalKeyUseCase: new AcquireApprovalKeyUseCase(new KISAuthClient, new RedisRepository),
    releaseApprovalKeyUseCase: new ReleaseApprovalKeyUseCase(new RedisRepository),
    
    getCurrentPriceUseCase: new GetCurrentPriceUseCase(),
    getMinChartUseCase: new GetMinChartUseCase(),
    getStockChartUseCase: new GetStockChartUseCase(new StockInfoUseCase(new PgStockRepository)),
    getOrderBookUseCase: new GetOrderBookUseCase(),
    getCheckRankUseCase: new GetCheckRankUseCase(new PgStockRepository),
}