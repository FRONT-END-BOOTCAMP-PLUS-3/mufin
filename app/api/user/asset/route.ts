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

// PATCH 메서드: 목표금액(target) 업데이트
export async function PATCH(request: Request) {
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
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
