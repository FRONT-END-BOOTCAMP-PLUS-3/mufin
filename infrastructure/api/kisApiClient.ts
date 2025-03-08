import { env } from "@/config/env";
import { fetchKISAccessToken } from "@/utils/fetchKISAccessToken";
import { NextResponse } from "next/server";

export async function fetchKISPrice(symbol: string) {
  const KISAccessToken = await fetchKISAccessToken();

  if (!KISAccessToken) {
    return NextResponse.json(
      { error: "KISAccessToken not found in cookies" },
      { status: 400 }
    );
  }
  const url = `${env.KIS_API_URL}/uapi/domestic-stock/v1/quotations/inquire-price`;

  const params = new URLSearchParams({
    FID_COND_MRKT_DIV_CODE: "J",
    FID_INPUT_ISCD: symbol,
  });

  const response = await fetch(`${url}?${params.toString()}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      authorization: `Bearer ${KISAccessToken}`,
      appkey: env.KIS_APP_KEY!,
      appsecret: env.KIS_APP_SECRET!,
      tr_id: "FHKST01010100",
      custtype: "P",
    },
  });
  // 7. 응답 에러 처리
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`외부 API 호출 실패: ${errorText}`);
  }

  return await response.json();
}
