import axios from 'axios';

export async function GET(req: Request) {
  try {
    const url = 'https://openapi.koreainvestment.com:9443/uapi/domestic-stock/v1/quotations/inquire-daily-itemchartprice';
    
    const getCurrentDate = (): string => {
        const today = new Date();
        const year = today.getFullYear(); // 연도
        const month = (today.getMonth() + 1).toString().padStart(2, '0'); // 월 (0부터 시작하므로 +1 해줌)
        const day = today.getDate().toString().padStart(2, '0'); // 일
      
        return `${year}${month}${day}`; // YYYYMMDD 형식으로 반환
    };

    // URLSearchParams로 쿼리 파라미터 생성
    const params = new URLSearchParams({
      FID_COND_MRKT_DIV_CODE: 'J',
      FID_INPUT_ISCD: req.url.split('?')[1].split('&')[0].split('=')[1],  // 요청된 symbol 추출
      FID_INPUT_DATE_1: '19871231',
      FID_INPUT_DATE_2: getCurrentDate(),
      FID_PERIOD_DIV_CODE: req.url.split('?')[1].split('&')[1].split('=')[1], // 요청된 activePeriod 추출
      FID_ORG_ADJ_PRC: '1',
    });

    const response = await axios.get(`${url}?${params.toString()}`, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'authorization': `Bearer ${process.env.KIS_ACCESS_TOKEN}`,
        'appkey': process.env.KIS_APP_KEY!,
        'appsecret': process.env.KIS_APP_SECRET!,
        'tr_id': 'FHKST03010100',
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
