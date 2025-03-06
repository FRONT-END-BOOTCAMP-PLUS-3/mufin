import { NextRequest, NextResponse } from "next/server";
import { HandleBuyUseCase } from "@/application/usecases/trade/BuyUseCase";
import { BuyDto } from "@/application/usecases/trade/dtos/BuyDto";
import { PgWalletRepository } from "@/infrastructure/repositories/PgWalletRepository";
import { getDecodedUserId } from "@/utils/getDecodedUserId";

export async function POST(req: NextRequest) {
  try {

    // request data
    const body: BuyDto = await req.json();
    const { stockId, quantity, price, totalAmount } = body;

    // 유효성 검사
    if (!stockId || quantity <= 0 || price <= 0 || totalAmount <= 0) {
      return NextResponse.json({ message: "잘못된 입력 값입니다." }, { status: 400 });
    }

    // 쿠키에 들어있는 userId 가져오기
    const userId: string | null = await getDecodedUserId();

    // 아이디 유효성 검사
    if(!userId) {
      return NextResponse.json( {message: "접근 권한이 없습니다." }, { status: 401 })
    }

    // // 수정 사항!!!
    const handleBuyUseCase = new HandleBuyUseCase();
    // // 수정 사항!!!
    const result = await handleBuyUseCase.handleBuy({ userId, stockId, quantity, price, totalAmount });

    return NextResponse.json(result, { status: 200 });

  } catch (error) {
    console.error("Error during buy operation:", error);
    return NextResponse.json({ message: "서버 내부 오류가 발생했습니다." },{ status: 500 });
  }
}

export async function GET() {
 
  try {
    // token의 있는 userId 가져오기
    const userId: string | null = await getDecodedUserId();

  if (!userId) {
    return NextResponse.json({ message: "접근 권한이 없습니다." }, { status: 401 });
  }

  // // 수정 사항!!!
  const walletRepository = new PgWalletRepository();
  // // 수정 사항!!! 
  const wallet = await walletRepository.findWalletByUserId(userId);

    if (!wallet) {
      return NextResponse.json({ message: "해당 사용자의 지갑 정보를 찾을 수 없습니다." }, { status: 500 });
    }

    return NextResponse.json({ cash: wallet.cash ? wallet.cash.toString() : "0" }, { status: 200 });
  } catch (error) {
    console.error("Error fetching wallet data:", error);
    return NextResponse.json({ message: "내부 서버 오류" }, { status: 500 });
  }
}