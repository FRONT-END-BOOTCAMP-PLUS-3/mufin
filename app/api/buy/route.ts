import { NextResponse } from "next/server";
import { HandleBuyUseCase } from "@/application/usecases/trade/BuyUseCase";
import { BuyDto } from "@/application/usecases/trade/dtos/BuyDto";

export async function POST(req: Request) {
  try {
    const body: BuyDto = await req.json();
    const { userId, stockId, quantity, price, totalAmount } = body;

    // 유효성 검사
    if (!userId || !stockId || quantity <= 0 || price <= 0 || totalAmount <= 0) {
      return NextResponse.json({ message: "잘못된 입력 값입니다." }, { status: 400 });
    }

    const handleBuyUseCase = new HandleBuyUseCase();
    const result = await handleBuyUseCase.handleBuy({ userId, stockId, quantity, price, totalAmount });

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
    return NextResponse.json({ message: "An unknown error occurred" }, { status: 400 });
  }
}
