import { env } from "@/config/env";

export async function GET(req: Request) {
  try {
    const url = `${env.KIS_API_URL}/uapi/domestic-stock/v1/quotations/inquire-time-itemchartprice`;
    
    const getCurrentTime = (offset: number): string => {
      const now = new Date();  
      const marketCloseTime = new Date();
      marketCloseTime.setHours(15, 15, 0, 0);
      const marketOpenTime = new Date();
      marketOpenTime.setHours(9, 0, 0, 0); 

      let resultTime = now;
      if (now >= marketCloseTime || now < marketOpenTime) {
        resultTime = new Date();
        resultTime.setHours(15, 15, 0, 0);
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
      const params = new URLSearchParams({
        FID_ETC_CLS_CODE: '',
        FID_COND_MRKT_DIV_CODE: 'J',
        FID_INPUT_ISCD: symbol,
        FID_INPUT_HOUR_1: formattedTime,
        FID_PW_DATA_INCU_YN: 'N',
      });

      console.log('Processing time:', formattedTime);

      const response = await fetch(`${url}?${params.toString()}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'authorization': `Bearer ${process.env.KIS_ACCESS_TOKEN}`,
          'appkey': process.env.KIS_APP_KEY!,
          'appsecret': process.env.KIS_APP_SECRET!,
          'tr_id': 'FHKST03010200',
          'custtype': 'P',
        },
      });

      if (!response.ok) {
        throw new Error(`API 요청 실패: ${response.status}`);
      }

      return response.json();
    });

    const data = await Promise.all(requests);  
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error: unknown) {
    console.error('API 요청 실패:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ message: '데이터 가져오기 실패', error: errorMessage }), { status: 500 });
  }
}
