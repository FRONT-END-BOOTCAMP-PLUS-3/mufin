import { NextResponse } from "next/server";
import { getDecodedUserId } from "@/utils/getDecodedUserId";
import { PgHistoryRepository } from "@/infrastructure/repositories/PgHistoryRepository";
import { PgStockRepository } from "@/infrastructure/repositories/PgStockRepository";
import { StockHistoryUseCase } from "@/application/usecases/stockhistory/StockHistoryUseCase";
import { IHistoryRepository } from "@/domain/repositories/IHistoryRepository";
import { IStockRepository } from "@/domain/repositories/IStockRepository";

// 리포지토리 인스턴스 생성
const historyRepository: IHistoryRepository = new PgHistoryRepository();  
const stockRepository: IStockRepository = new PgStockRepository();    

// 모든 리포지토리를 전달하여 UseCase 생성
const stockHistoryUseCase = new StockHistoryUseCase(historyRepository, stockRepository);

export async function GET() {
  try {
    const userId: string | null = await getDecodedUserId();

    if (!userId) {
      return NextResponse.json({ message: "접근 권한이 없습니다." }, { status: 401 });
    }

    const history = await stockHistoryUseCase.getHistory(userId);

    return NextResponse.json({ history }, { status: 200 });
  } catch (error) {
    console.error("Error fetching history:", error);
    return NextResponse.json({ message: "서버 오류가 발생했습니다." }, { status: 500 });
  }
}
