import { StockListUseCase } from "@/application/usecases/home/StockLIstUseCase";
import { IStockListUseCase } from "@/application/usecases/home/interfaces/IStockListUseCase";
import { StockInfoUseCase } from "@/application/usecases/stock/StockInfoUseCase";
import { IStockRepository } from "@/domain/repositories/IStockRepository";
import { kisAPIDi } from "@/infrastructure/config/kisApiDi";
import { PgStockRepository } from "@/infrastructure/repositories/PgStockRepository";
import { NextResponse } from "next/server";


export async function GET() {
  try {
    const stockCodes = ["005930", "000660", "373220", "035720"];


    // repository 인스턴스 생성
    const stockRepository: IStockRepository = new PgStockRepository();

    // usecase 인스턴스 생성
    const getHomeDataUseCase: IStockListUseCase = new StockListUseCase(
      kisAPIDi.getCurrentPriceUseCase,
      new StockInfoUseCase(stockRepository)
    );

    const results = await Promise.all(
      stockCodes.map((stockCode) => getHomeDataUseCase.execute(stockCode))
    );
    
    if (results.length === 0) {
      return NextResponse.json(
        { error: "요청 데이터의 정보가 없습니다." },
        { status: 500 }
      );
    }

    return NextResponse.json(results, { status: 200 });
  } catch (error) {
    console.error("Current API REST API ERROR:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
