// app/api/user/asset/route.ts
import { NextResponse, NextRequest } from "next/server";
import { getDecodedUserId } from "@/utils/getDecodedUserId";
import { GetUserAssetUseCase } from "@/application/usecases/user/GetUserAssetUseCase";
import { PgWalletRepository } from "@/infrastructure/repositories/PgWalletRepository";
import { PgPortfolioRepository } from "@/infrastructure/repositories/PgPortfolioRepository";
import { GetCurrentPriceUseCase } from "@/application/usecases/kis/GetCurrentPriceUseCase";
import { GetUserPortfolioUseCase } from "@/application/usecases/user/GetUserPortfolioUseCase";

// GET 메서드: Wallet 정보와 Portfolio(보유종목+현재가) 정보를 모두 조회하여 반환
export async function GET() {
    // 쿠키에 저장된 JWT 토큰에서 userId 추출
    const userId = await getDecodedUserId();
    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    // Wallet 데이터 조회
    const walletRepository = new PgWalletRepository();
    const getUserAssetUseCase = new GetUserAssetUseCase(walletRepository);
    // Portfolio + 현재가 데이터 조회
    const portfolioRepository = new PgPortfolioRepository();
    const getCurrentPriceUseCase = new GetCurrentPriceUseCase();
    const getUserPortfolioUseCase = new GetUserPortfolioUseCase(portfolioRepository, getCurrentPriceUseCase);
    try {
        const userAsset = await getUserAssetUseCase.execute(userId);
        const portfolioData = await getUserPortfolioUseCase.execute(userId);
        // walletData에 holdings(포트폴리오) 데이터를 추가하여 반환
        const result = {
            ...userAsset,
            holdings: portfolioData,
        };
        return NextResponse.json(result);
    } catch (error: unknown) {
        console.error("GET /api/user/asset error:", error);
        const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}

// PATCH 메서드: 목표금액(target) 업데이트
export async function PATCH(request: NextRequest) {
    const userId = await getDecodedUserId();
    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { target } = await request.json();
        if (typeof target !== "number") {
            return NextResponse.json({ error: "Invalid target value" }, { status: 400 });
        }
        const walletRepository = new PgWalletRepository();
        const updatedWallet = await walletRepository.updateTargetByUserId(userId, target);
        // 업데이트 후 DB에서 가져온 target 값을 number로 변환하여 반환
        return NextResponse.json({ target: Number(updatedWallet.target) });
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}
