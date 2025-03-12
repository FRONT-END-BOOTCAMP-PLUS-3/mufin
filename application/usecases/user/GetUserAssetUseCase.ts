// application/usecases/user/GetUserAssetUseCase.ts
import { IWalletRepository } from "@/domain/repositories/IWalletRepository";
import { UserAssetDTO } from "@/application/usecases/user/dtos/userAssetDto";

export class GetUserAssetUseCase {
    constructor(private walletRepository: IWalletRepository) {}

    async execute(userId: string): Promise<UserAssetDTO> {
        const wallet = await this.walletRepository.findWalletByUserId(userId);
        if (!wallet) {
            throw new Error("Wallet not found");
        }

        // Prisma의 BigInt 타입을 number로 변환
        const cash = Number(wallet.cash);
        const account = Number(wallet.account);
        const target = Number(wallet.target);

        // 증권계좌 자산은 예수금(cash)로 처리 (보유종목 가격 합산은 추후 구현)
        const securitiesAccount = cash;
        // 일반계좌 자산은 account
        const bankAccount = account;
        const totalAssets = securitiesAccount + bankAccount;

        // 평가손익 등은 아직 구현하지 않았으므로 0 처리
        return {
            goalAmount: target,
            securitiesAccount,
            bankAccount,
            totalAssets,
            profit: 0,
            profitRate: 0,
            investmentAmount: 0,
            totalProfit: 0,
            totalProfitRate: 0,
            cash,
            holdings: [], // 보유종목 데이터 미구현
        };
    }
}
