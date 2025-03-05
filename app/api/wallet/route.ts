import { PgWalletRepository } from "@/infrastructure/repositories/PgWalletRepository";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  const walletRepository = new PgWalletRepository();

  if (!userId) {
    return NextResponse.json({ message: "userId가 필수로 제공되어야 합니다." }, { status: 400 });
  }

  try {
    const wallet = await walletRepository.findWalletByUserId(
      userId,
    );

    if (!wallet) {
      return NextResponse.json(
        { message: "해당 사용자의 지갑 정보를 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    return NextResponse.json({ cash: wallet.cash }, { status: 200 });
  } catch (error) {
    console.error("Error fetching wallet data:", error);
    return NextResponse.json(
      { message: "내부 서버 오류" },
      { status: 500 }
    );
  }
}
