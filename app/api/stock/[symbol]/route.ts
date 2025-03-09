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
    
    // param을 통해 동적 주식코드 받아오기
    const { symbol } = await params;

    //query String을 통해서 activePeriod의 값을 가져와서 종류 비교
    const { searchParams } = new URL(req.url);
    const activePeriod = searchParams.get("activePeriod") || "1m";

    // symbol의 값이 있는지 유효성 검사 진행
    if (!symbol) {
      return NextResponse.json({ error: "Symbol is required" }, { status: 400 });
    }

    // api 호출 결과 배열 생성
    let stockChartDtos: StockChartDto[] = [];

    // activePeriod 가 1m(분봉)일 때 분봉 데이터 호출
    if (activePeriod === "1m") {
      // 분봉 데이터 usecase생성
      const getMinChartUseCase: IGetMinChartUseCase = new GetMinChartUseCase();
      // usecase실행 결과 배열에 담기
      stockChartDtos = await getMinChartUseCase.execute(symbol);

      // 결과 배열 유효성 검사
      if (stockChartDtos.length === 0) {
        return NextResponse.json({ message: "KIS API에서 데이터를 가져오는데 실패하였습니다." },{ status: 500 });
      }
      // 분봉이 아닌 일, 주, 월, 년 봉 데이터 호출
    } else {
      // repository 생성
      const stockRepository = new PgStockRepository();
      // usecase 생성
      const stockUseCase = new StockInfoUseCase(stockRepository);
      // usecase를 통해 stockChart 가져오기
      const getStockChartUseCase: IGetStockChartUseCase = new GetStockChartUseCase(stockUseCase);
      stockChartDtos = await getStockChartUseCase.execute(symbol, activePeriod);

      //유효성 검사
      if (stockChartDtos.length === 0) {
        return NextResponse.json({ error: "주식 차트 데이터가 존재하지 않습니다." }, { status: 500 }
        );
      }
    }
    // api 요청 성공 시 결과 dto배열 반환
    return NextResponse.json(stockChartDtos, { status: 200 });
    
    // api 요청 실패 시 error 반환
  } catch (error: unknown) {
    console.error("API 요청 실패:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";

    return NextResponse.json({ message: "데이터 가져오기 실패", error: errorMessage },{ status: 500 });
  }
}
