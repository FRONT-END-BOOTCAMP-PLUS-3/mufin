import { AccessTokenUseCase } from "@/application/usecases/kis/AccessTokenUseCase";
import { GetCurrentPriceUseCase } from "@/application/usecases/kis/GetCurrentPriceUseCase";
import { IAccessTokenUseCase } from "@/application/usecases/kis/interfaces/IAccessTokenUseCase";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {

    const kisAccessTokenUseCase :IAccessTokenUseCase = new AccessTokenUseCase(); 
    const KISAccessToken = await kisAccessTokenUseCase.execute();

    if (!KISAccessToken) {
      return NextResponse.json({ error: "KISAccessToken not found in cookies" }, { status: 400 });
    }

    

    const queryParams = new URL(req.url).searchParams;
    const symbol = queryParams.get('symbol') || '';

     const currentPriceUseCase = new GetCurrentPriceUseCase();

     const data = await currentPriceUseCase.execute(symbol);
    console.log(data);
  

    return  NextResponse.json(data, { status: 200 });
  } catch (error: unknown) {
    console.error('API 요청 실패:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return  NextResponse.json({ message: '데이터 가져오기 실패', error: errorMessage }, { status: 500 });
  }
}
