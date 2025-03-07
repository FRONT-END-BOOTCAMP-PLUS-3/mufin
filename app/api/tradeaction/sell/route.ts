import { NextRequest, NextResponse } from "next/server";
import { HandleSellUseCase } from "@/application/usecases/trade/SellUseCase";
import { SellDto } from "@/application/usecases/trade/dtos/SellDto";
import { PgPortfolioRepository } from "@/infrastructure/repositories/PgPortfolioRepository";
import { getDecodedUserId } from "@/utils/getDecodedUserId";

export async function POST(req: Request) {
  try {
    // request data
    const body: SellDto = await req.json();
    const { stockId, quantity, price, totalAmount } = body;

    // 유효성 검사
    if ( !stockId || quantity <= 0 || price <= 0 || totalAmount <= 0) {
      return NextResponse.json({ message: "잘못된 입력 값입니다." }, { status: 400 });
    }

    // 쿠키의 있는 userId가져오기
    const userId: string | null = await getDecodedUserId();
    //userId 유효성 검사
    if(!userId) {
      return NextResponse.json( {message: "접근 권한이 없습니다." }, { status: 401 })
    }

    // // 수정 사항!!!
    const handleSellUseCase = new HandleSellUseCase();
    // // 수정 사항!!!
    const result = await handleSellUseCase.handleSell({ userId, stockId, quantity, price, totalAmount });

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error during sell operation:", error);
    return NextResponse.json({ message: "서버 내부 오류가 발생했습니다." },{ status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    // URL prams, searchPrams를 통한 request data
  const { searchParams } = new URL(req.url);
  const stockId = searchParams.get("stockId");

  // 유효성 검사
  if (!stockId) {
    return NextResponse.json({ message: "stockId는 필수로 제공되어야 합니다." },{ status: 400 });
  }

  // 쿠키의 있는 userId 가져오기
  const userId: string | null = await getDecodedUserId();

  if(!userId){
    return NextResponse.json( {message: "접근 권한이 없습니다." }, { status: 401 })
  }

    // // 수정 사항!!!
    const portfolioRepository = new PgPortfolioRepository();
    // // 수정 사항!!!
    const portfolio = await portfolioRepository.findPortfolioByUserIdAndStockCode(userId, Number(stockId));

    if (!portfolio) {
      return NextResponse.json({ quantity: 0 }, { status: 200 });
    }

    return NextResponse.json({ quantity: portfolio.stockQty }, { status: 200 });
  } catch (error) {
    console.error("Error fetching portfolio:", error);
    return NextResponse.json({ message: "서버 오류가 발생했습니다." }, { status: 500 });
  }
}

