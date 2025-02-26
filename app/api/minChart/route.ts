import axios from 'axios';

export async function GET(req: Request) {
  try {
    const url = 'https://openapi.koreainvestment.com:9443/uapi/domestic-stock/v1/quotations/inquire-time-itemchartprice';
    
    const getCurrentTime = (offset: number): string => {
      const now = new Date();  // 현재 시간 받아오기
      
      // 장 마감 시간 설정 (15:15)
      const marketCloseTime = new Date();
      marketCloseTime.setHours(15, 15, 0, 0);

      const marketOpenTime = new Date();
      marketOpenTime.setHours(9, 0, 0, 0); 
    
      let resultTime = now;
    
      if (now >= marketCloseTime || now < marketOpenTime) {
        resultTime = new Date();
        resultTime.setHours(15, 15, 0, 0);
    
        // 이후에는 31분씩 빼기
        resultTime.setMinutes(resultTime.getMinutes() - offset * 31); 
      } else {
        // 장이 열려있을 때는 31분 간격으로 현재 시간에서 설정
        resultTime.setMinutes(resultTime.getMinutes() - offset * 31);
      }
    
      // 결과 시간은 00초로 고정하여 반환
      const hours = resultTime.getHours().toString().padStart(2, '0');
      const minutes = resultTime.getMinutes().toString().padStart(2, '0');
    
      return `${hours}${minutes}00`;  // HHMM00 형식
    };
    
    const requests = Array.from({ length: 4 }, (_, i) => {
      const formattedTime = getCurrentTime(i);
      // URLSearchParams로 쿼리 파라미터 생성
      const params = new URLSearchParams({
        FID_ETC_CLS_CODE: '',
        FID_COND_MRKT_DIV_CODE: 'J',
        FID_INPUT_ISCD: req.url.split('?')[1].split('&')[0].split('=')[1],
        FID_INPUT_HOUR_1: formattedTime,
        FID_PW_DATA_INCU_YN: 'N',
      });

      console.log('Processing time:', formattedTime);

      return axios.get(`${url}?${params.toString()}`, {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'authorization': `Bearer ${process.env.KIS_ACCESS_TOKEN}`,
          'appkey': process.env.KIS_APP_KEY!,
          'appsecret': process.env.KIS_APP_SECRET!,
          'tr_id': 'FHKST03010200',
          'custtype': 'P',
        },
      }).then(response => response.data);
    });

    const data = await Promise.all(requests);  // 모든 요청 처리 완료 후 데이터 반환
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error: unknown) {
    console.error('API 요청 실패:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ message: '데이터 가져오기 실패', error: errorMessage }), { status: 500 });
  }
}
