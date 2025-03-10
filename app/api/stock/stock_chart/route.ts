import { StockChartDto } from "@/application/usecases/kis/dtos/StockChartDto";
import { GetStockChartUseCase } from "@/application/usecases/kis/GetStockChartUseCase";
import { IGetStockChartUseCase } from "@/application/usecases/kis/interfaces/IGetStockChartUseCase";
import { StockInfoUseCase } from "@/application/usecases/stock/StockInfoUseCase";
import { PgStockRepository } from "@/infrastructure/repositories/PgStockRepository";

import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    // 요청된 symbol과 activePeriod 추출
    const queryParams = new URL(req.url).searchParams;
    const symbol = queryParams.get("symbol") || "";
    const activePeriod = queryParams.get("activePeriod") || "D";
    
    const stockRepository = new PgStockRepository();
    const stockUseCase = new StockInfoUseCase(stockRepository);

    //
    const getStockChartUseCase : IGetStockChartUseCase = new GetStockChartUseCase(stockUseCase)

    const stockChartDtos: StockChartDto[] = await getStockChartUseCase.execute(symbol, activePeriod);

    if(stockChartDtos.length === 0) {
      return NextResponse.json({ error: '주식 차트 데이터가 존재하지 않습니다.' }, { status: 500 });
    }

    return NextResponse.json(stockChartDtos,{status:200})

  } catch (error: unknown) {
    console.error("API 요청 실패:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { message: "데이터 가져오기 실패", error: errorMessage },
      { status: 500 }
    );
  }
}
