import { PgPortfolioRepository } from "@/infrastructure/repositories/PgPortfolioRepository";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const portfolioRepository = new PgPortfolioRepository();
  const { searchParams } = new URL(req.url);
  const stockId = searchParams.get("stockId");
  const userId = searchParams.get("userId");

  if (!userId || !stockId) {
    return NextResponse.json(
      { message: "userId와 stockId는 필수로 제공되어야 합니다." },
      { status: 400 }
    );
  }

  try {
    const portfolio = await portfolioRepository.findPortfolioByUserIdAndStockCode(
      userId,
      Number(stockId)
    );

    if (!portfolio) {
      return NextResponse.json({ quantity: 0 }, { status: 200 });
    }

    return NextResponse.json({ quantity: portfolio.stockQty }, { status: 200 });
  } catch (error) {
    console.error("Error fetching portfolio:", error);
    return NextResponse.json({ message: "서버 오류가 발생했습니다." }, { status: 500 });
  }
}
