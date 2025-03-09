import { AccessTokenUseCase } from "@/application/usecases/kis/AccessTokenUseCase";
import { IAccessTokenUseCase } from "@/application/usecases/kis/interfaces/IAccessTokenUseCase";
import { fetchKISMinChart } from "@/infrastructure/api/kisApiClient";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const kisAccessTokenUseCase :IAccessTokenUseCase = new AccessTokenUseCase(); 
    const KISAccessToken = await kisAccessTokenUseCase.execute();

    if (!KISAccessToken) {
      return NextResponse.json({ error: "KISAccessToken not found in cookies" }, { status: 400 });
    }


    const getCurrentTime = (offset: number): string => {
      const now = new Date();  
      const marketCloseTime = new Date();
      marketCloseTime.setHours(15, 20, 0, 0);
      const marketOpenTime = new Date();
      marketOpenTime.setHours(9, 0, 0, 0); 

      let resultTime = now;
      if (now >= marketCloseTime || now < marketOpenTime) {
        resultTime = new Date();
        resultTime.setHours(15, 20, 0, 0);
        resultTime.setMinutes(resultTime.getMinutes() - offset * 31); 
      } else {
        resultTime.setMinutes(resultTime.getMinutes() - offset * 31);
      }

      const hours = resultTime.getHours().toString().padStart(2, '0');
      const minutes = resultTime.getMinutes().toString().padStart(2, '0');

      return `${hours}${minutes}00`;  
    };
    
    const symbol = req.url.split('?')[1].split('&')[0].split('=')[1];

    const requests = Array.from({ length: 4 }, async (_, i) => {
      const formattedTime = getCurrentTime(i);


      console.log('Processing time:', formattedTime);

      return fetchKISMinChart(symbol, formattedTime);

    });

    const data = await Promise.all(requests);  
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error: unknown) {
    console.error('API 요청 실패:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ message: '데이터 가져오기 실패', error: errorMessage }), { status: 500 });
  }
}
