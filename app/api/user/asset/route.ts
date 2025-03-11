import { NextResponse } from "next/server";
import { getDecodedUserId } from "@/utils/getDecodedUserId";
import { GetUserAssetUseCase } from "@/application/usecases/user/GetUserAssetUseCase";
import { PgWalletRepository } from "@/infrastructure/repositories/PgWalletRepository";

export async function GET() {
    const userId = await getDecodedUserId();
    
    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const walletRepository = new PgWalletRepository();
    const getUserAssetUseCase = new GetUserAssetUseCase(walletRepository);

    try {
        const userAsset = await getUserAssetUseCase.execute(userId);
        return NextResponse.json(userAsset);
    } catch (error) {
        console.error('Error fetching asset data:', error);
        return NextResponse.json({ error: '자산 데이터를 불러오는 데 실패했습니다.' }, { status: 500 });
    }
}
