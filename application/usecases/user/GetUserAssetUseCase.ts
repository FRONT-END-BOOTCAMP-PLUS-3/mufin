// application/usecases/user/GetUserAssetUseCase.ts
import { IWalletRepository } from "@/domain/repositories/IWalletRepository";

export interface UserAssetDTO {
    // 나의 투자목표: Wallet의 target 필드
    goalAmount: number;
    // 증권계좌 자산: 예수금(cash) (보유종목 가격 합산은 추후 구현)
    securitiesAccount: number;
    // 일반계좌 자산: Wallet의 account 필드
    bankAccount: number;
    // 총 자산: 증권계좌 자산 + 일반계좌 자산
    totalAssets: number;
    // 아래 값들은 보유종목 및 평가손익 관련 계산 (추후 구현 예정)
    profit: number;
    profitRate: number;
    investmentAmount: number;
    totalProfit: number;
    totalProfitRate: number;
    // 예수금
    cash: number;
    // 보유종목 배열 (현재는 미구현이므로 빈 배열)
    holdings: any[];
}

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
