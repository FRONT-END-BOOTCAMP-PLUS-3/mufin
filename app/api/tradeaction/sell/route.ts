import { NextResponse } from "next/server";
import { HandleSellUseCase } from "@/application/usecases/trade/SellUseCase";
import { SellDto } from "@/application/usecases/trade/dtos/SellDto";

export async function POST(req: Request) {
  try {
    const body: SellDto = await req.json();
    const { userId, stockId, quantity, price, totalAmount } = body;

    // 유효성 검사
    if (!userId || !stockId || quantity <= 0 || price <= 0 || totalAmount <= 0) {
      return NextResponse.json({ message: "잘못된 입력 값입니다." }, { status: 400 });
    }

    const handleSellUseCase = new HandleSellUseCase();
    const result = await handleSellUseCase.handleSell({ userId, stockId, quantity, price, totalAmount });

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error during sell operation:", error);
    return NextResponse.json(
      { message: "서버 내부 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
