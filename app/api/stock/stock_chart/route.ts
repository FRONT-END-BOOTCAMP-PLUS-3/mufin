import { StockInfoUseCase } from "@/application/usecases/stock/StockInfoUseCase";
import { fetchKISStockChart } from "@/infrastructure/api/kisApiClient";
import { PgStockRepository } from "@/infrastructure/repositories/PgStockRepository";

import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    // 요청된 symbol과 activePeriod 추출
    const queryParams = new URL(req.url).searchParams;
    const symbol = queryParams.get("symbol") || "";
    const activePeriod = queryParams.get("activePeriod") || "";

    const stockRepository = new PgStockRepository();
    const stockUsecase = new StockInfoUseCase(stockRepository);

    const stockData = await stockUsecase.getStockInfoByCode(symbol);

    const getCurrentDate = (): string => {
      const today = new Date();
      const year = today.getFullYear();
      const month = (today.getMonth() + 1).toString().padStart(2, "0");
      const day = today.getDate().toString().padStart(2, "0");

      return `${year}${month}${day}`;
    };

    if (!stockData || !stockData.stockOpen) {
      return NextResponse.json(
        { error: "상장일 정보를 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    const stockOpenDate = stockData.stockOpen;

    const data = await fetchKISStockChart(
      symbol,
      stockOpenDate,
      getCurrentDate(),
      activePeriod
    );

    return NextResponse.json(data, { status: 200 });
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
