import { NextRequest, NextResponse } from "next/server";
import { HandleSellUseCase } from "@/application/usecases/tradeaction/SellUseCase";
import { SellDto } from "@/application/usecases/tradeaction/dtos/SellDto";
import { PgPortfolioRepository } from "@/infrastructure/repositories/PgPortfolioRepository";
import { getDecodedUserId } from "@/utils/getDecodedUserId";
import { PgWalletRepository } from "@/infrastructure/repositories/PgWalletRepository";
import { PgHistoryRepository } from "@/infrastructure/repositories/PgHistoryRepository";
import { IWalletRepository } from "@/domain/repositories/IWalletRepository";
import { IPortfolioRepository } from "@/domain/repositories/IPortfolioRepository";
import { IHistoryRepository } from "@/domain/repositories/IHistoryRepository";

// 리포지토리 인스턴스 생성
const walletRepository : IWalletRepository = new PgWalletRepository();
const portfolioRepository : IPortfolioRepository = new PgPortfolioRepository();
const historyRepository : IHistoryRepository = new PgHistoryRepository();

// 모든 리포지토리를 전달하여 UseCase 생성
const handleSellUseCase = new HandleSellUseCase(walletRepository, portfolioRepository, historyRepository);

export async function POST(req: Request) {
  try {
    const body: SellDto = await req.json();
    const { stockId, quantity, price, totalAmount } = body;

    if ( !stockId || quantity <= 0 || price <= 0 || totalAmount <= 0) {
      return NextResponse.json({ message: "잘못된 입력 값입니다." }, { status: 400 });
    }

    const userId: string | null = await getDecodedUserId();

    if(!userId) {
      return NextResponse.json( {message: "접근 권한이 없습니다." }, { status: 401 })
    }

    const result = await handleSellUseCase.handleSell({ userId, stockId, quantity, price, totalAmount });

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error during sell operation:", error);
    return NextResponse.json({ message: "서버 내부 오류가 발생했습니다." },{ status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const stockId = searchParams.get("stockId");

    if (!stockId) {
      return NextResponse.json({ message: "stockId는 필수로 제공되어야 합니다." },{ status: 400 });
    }

    const userId: string | null = await getDecodedUserId();

    if(!userId){
      return NextResponse.json( {message: "접근 권한이 없습니다." }, { status: 401 })
    }

    const quantity = await handleSellUseCase.getPortfolio(userId, Number(stockId));

    return NextResponse.json({ quantity }, { status: 200 });
  } catch (error) {
    console.error("Error fetching portfolio:", error);
    return NextResponse.json({ message: "서버 오류가 발생했습니다." }, { status: 500 });
  }
}

