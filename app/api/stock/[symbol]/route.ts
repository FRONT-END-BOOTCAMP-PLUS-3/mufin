import { NextRequest, NextResponse } from "next/server";
import { StockChartDto } from "@/application/usecases/kis/dtos/StockChartDto";

// 분봉 차트용 usecase
import { GetMinChartUseCase } from "@/application/usecases/kis/GetMinChartUseCase";
import { IGetMinChartUseCase } from "@/application/usecases/kis/interfaces/IGetMinChartUseCase";

// 일반 봉 차트용 usecase
import { GetStockChartUseCase } from "@/application/usecases/kis/GetStockChartUseCase";
import { IGetStockChartUseCase } from "@/application/usecases/kis/interfaces/IGetStockChartUseCase";
import { StockInfoUseCase } from "@/application/usecases/stock/StockInfoUseCase";
import { PgStockRepository } from "@/infrastructure/repositories/PgStockRepository";

export async function GET(req: NextRequest,{ params }: { params: { symbol: string }}) {
  try {
    const { searchParams } = new URL(req.url);

    const { symbol } = await params;
    const activePeriod = searchParams.get("activePeriod") || "1m";

    if (!symbol) {
      return NextResponse.json({ error: "Symbol is required" }, { status: 400 });
    }

    let stockChartDtos: StockChartDto[] = [];

    if (activePeriod === "1m") {
      const getMinChartUseCase: IGetMinChartUseCase = new GetMinChartUseCase();
      stockChartDtos = await getMinChartUseCase.execute(symbol);

      if (stockChartDtos.length === 0) {
        return NextResponse.json(
          { message: "KIS API에서 데이터를 가져오는데 실패하였습니다." },
          { status: 500 }
        );
      }
    } else {
      const stockRepository = new PgStockRepository();
      const stockUseCase = new StockInfoUseCase(stockRepository);
      const getStockChartUseCase: IGetStockChartUseCase = new GetStockChartUseCase(stockUseCase);
      stockChartDtos = await getStockChartUseCase.execute(symbol, activePeriod);

      if (stockChartDtos.length === 0) {
        return NextResponse.json(
          { error: "주식 차트 데이터가 존재하지 않습니다." },
          { status: 500 }
        );
      }
    }

    return NextResponse.json(stockChartDtos, { status: 200 });
  } catch (error: unknown) {
    console.error("API 요청 실패:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";

    return NextResponse.json({ message: "데이터 가져오기 실패", error: errorMessage },{ status: 500 });
  }
}
