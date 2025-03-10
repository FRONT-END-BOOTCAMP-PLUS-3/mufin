import { NextResponse } from "next/server";
import { StockChartDto } from "@/application/usecases/kis/dtos/StockChartDto";
import { GetMinChartUseCase } from "@/application/usecases/kis/GetMinChartUseCase";
import { IGetMinChartUseCase } from "@/application/usecases/kis/interfaces/IGetMinChartUseCase";


export async function GET(req: Request) {
  try {
    const symbol = req.url.split('?')[1].split('&')[0].split('=')[1];
    
    const getMinChartUseCase: IGetMinChartUseCase = new GetMinChartUseCase();

    const stockChartDtos: StockChartDto[] = await getMinChartUseCase.execute(symbol);

    if(stockChartDtos.length === 0 ) {
      return NextResponse.json({ message: 'KIS API에서 데이터를 가져오는데 실패하였습니다.' }, { status: 500 });  // KIS API에서 에러가 발생하였을 경우 500 Internal Server Error 반환  // TODO: 에러 로깅 or KIS API 에러 처리 로직 추가 필요  // TODO: KIS API 에러 로깅 or KIS API 에러 처리
    }

    return NextResponse.json(stockChartDtos, { status: 200 });
  } catch (error: unknown) {
    console.error('API 요청 실패:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ message: '데이터 가져오기 실패', error: errorMessage }, { status: 500 });
  }
}
