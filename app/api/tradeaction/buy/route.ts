import { NextRequest, NextResponse } from "next/server";
import { HandleBuyUseCase } from "@/application/usecases/tradeaction/BuyUseCase";
import { BuyDto } from "@/application/usecases/tradeaction/dtos/BuyDto";
import { PgWalletRepository } from "@/infrastructure/repositories/PgWalletRepository";
import { getDecodedUserId } from "@/utils/getDecodedUserId";
import { PgPortfolioRepository } from "@/infrastructure/repositories/PgPortfolioRepository";
import { PgHistoryRepository } from "@/infrastructure/repositories/PgHistoryRepository";
import { IWalletRepository } from "@/domain/repositories/IWalletRepository";
import { IPortfolioRepository } from "@/domain/repositories/IPortfolioRepository";
import { IHistoryRepository } from "@/domain/repositories/IHistoryRepository";

// 리포지토리 인스턴스 생성
const walletRepository : IWalletRepository = new PgWalletRepository();
const portfolioRepository : IPortfolioRepository = new PgPortfolioRepository();
const historyRepository : IHistoryRepository = new PgHistoryRepository();

// 모든 리포지토리를 전달하여 UseCase 생성
const handleBuyUseCase = new HandleBuyUseCase(walletRepository, portfolioRepository, historyRepository);

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

    const result = await handleBuyUseCase.handleBuy({ userId, stockId, quantity, price, totalAmount });

    return NextResponse.json(result, { status: 200 });

  } catch (error) {
    console.error("Error during buy operation:", error);
    return NextResponse.json({ message: "서버 내부 오류가 발생했습니다." },{ status: 500 });
  }
}

export async function GET() {
  try {
    const userId: string | null = await getDecodedUserId();

    if (!userId) {
      return NextResponse.json({ message: "접근 권한이 없습니다." }, { status: 401 });
    }

    const walletData = await handleBuyUseCase.getCash(userId);

    return NextResponse.json(walletData, { status: 200 });
  } catch (error) {
    console.error("Error fetching wallet data:", error);
    return NextResponse.json({ message: "내부 서버 오류" }, { status: 500 });
  }
}