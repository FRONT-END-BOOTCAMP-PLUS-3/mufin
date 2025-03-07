import { NextRequest, NextResponse } from "next/server";
import { PgWalletRepository } from "@/infrastructure/repositories/PgWalletRepository";
import { PgPortfolioRepository } from "@/infrastructure/repositories/PgPortfolioRepository";
import { GetUserAssetUseCase } from "@/application/usecases/user/GetUserAssetUseCase";
import { getDecodedUserId } from "@/utils/getDecodedUserId";

export async function GET(req: NextRequest) {
    try {
        // 요청 헤더에서 사용자 ID 가져오기 (JWT 토큰 디코딩)
        const userId = await getDecodedUserId(req);
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Repository 인스턴스 생성
        const walletRepo = new PgWalletRepository();
        const portfolioRepo = new PgPortfolioRepository();

        // 유스케이스 실행 (보유 자산 조회)
        const getUserAssetUseCase = new GetUserAssetUseCase(walletRepo, portfolioRepo);
        const userAssets = await getUserAssetUseCase.execute(userId);

        return NextResponse.json(userAssets, { status: 200 });
    } catch (error) {
        console.error("Error fetching user assets:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
