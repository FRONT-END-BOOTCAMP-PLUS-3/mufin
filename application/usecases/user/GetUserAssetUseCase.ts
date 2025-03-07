import { IWalletRepository } from "@/domain/repositories/IWalletRepository";
import { IPortfolioRepository } from "@/domain/repositories/IPortfolioRepository";

export class GetUserAssetUseCase {
    private walletRepo: IWalletRepository;
    private portfolioRepo: IPortfolioRepository;

    constructor(walletRepo: IWalletRepository, portfolioRepo: IPortfolioRepository) {
        this.walletRepo = walletRepo;
        this.portfolioRepo = portfolioRepo;
    }

    async execute(userId: string) {
        // 사용자의 지갑 정보 조회
        const wallet = await this.walletRepo.findWalletByUserId(userId);

        // 사용자의 포트폴리오 정보 조회
        const portfolio = await this.portfolioRepo.findPortfoliosByUserId(userId);

        return {
            wallet,
            portfolio,
        };
    }
}
