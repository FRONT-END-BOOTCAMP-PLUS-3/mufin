import axios from 'axios';

export async function GET(req: Request) {
  try {
    const url = 'https://openapi.koreainvestment.com:9443/uapi/domestic-stock/v1/quotations/inquire-time-itemchartprice';
    
    const getCurrentTime = (): string => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0'); // 시
      const minutes = now.getMinutes().toString().padStart(2, '0'); // 분
  
      return `${hours}${minutes}00`;
  };

    // URLSearchParams로 쿼리 파라미터 생성
    const params = new URLSearchParams({
      FID_ETC_CLS_CODE: "",
      FID_COND_MRKT_DIV_CODE: 'J',
      FID_INPUT_ISCD: req.url.split('?')[1].split('&')[0].split('=')[1],
      FID_INPUT_DATE_1: getCurrentTime(),
      FID_PW_DATA_INCU_YN: 'Y',
    });

    const response = await axios.get(`${url}?${params.toString()}`, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'authorization': `Bearer ${process.env.KIS_ACCESS_TOKEN}`,
        'appkey': process.env.KIS_APP_KEY!,
        'appsecret': process.env.KIS_APP_SECRET!,
        'tr_id': 'FHKST03010200',
        'custtype': 'P',
      },
    });

    return new Response(JSON.stringify(response.data), { status: 200 });
  } catch (error: unknown) {
    console.error('API 요청 실패:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ message: '데이터 가져오기 실패', error: errorMessage }), { status: 500 });
  }
}
