import { env } from "@/config/env";
import { fetchKISAccessToken } from "@/utils/fetchKISAccessToken";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const KISAccessToken = await fetchKISAccessToken();

    if (!KISAccessToken) {
      return NextResponse.json({ error: "KISAccessToken not found in cookies" }, { status: 400 });
    }

    const url = `${env.KIS_API_URL}/uapi/domestic-stock/v1/quotations/inquire-price`;

    const queryParams = new URL(req.url).searchParams;
    const symbol = queryParams.get('symbol') || '';

    const params = new URLSearchParams({
      FID_COND_MRKT_DIV_CODE: 'J',
      FID_INPUT_ISCD: symbol,
    });

    const response = await fetch(`${url}?${params.toString()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'authorization': `Bearer ${KISAccessToken}`,
        'appkey': env.KIS_APP_KEY!,
        'appsecret': env.KIS_APP_SECRET!,
        'tr_id': 'FHKST01010100',
        'custtype': 'P',
      },
    });

    if (!response.ok) {
      throw new Error(`API 요청 실패: ${response.status}`);
    }

    const data = await response.json();

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error: unknown) {
    console.error('API 요청 실패:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ message: '데이터 가져오기 실패', error: errorMessage }), { status: 500 });
  }
}
