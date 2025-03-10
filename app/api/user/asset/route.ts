// app/api/user/asset/route.ts
import { NextResponse } from "next/server";
import { getDecodedUserId } from "@/utils/getDecodedUserId";
import { GetUserAssetUseCase } from "@/application/usecases/user/GetUserAssetUseCase";
import { PgWalletRepository } from "@/infrastructure/repositories/PgWalletRepository";

export async function GET(request: Request) {
    // 쿠키에 저장된 JWT 토큰에서 userId 추출
    const userId = await getDecodedUserId();
    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const walletRepository = new PgWalletRepository();
    const getUserAssetUseCase = new GetUserAssetUseCase(walletRepository);

    try {
        const userAsset = await getUserAssetUseCase.execute(userId);
        return NextResponse.json(userAsset);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
