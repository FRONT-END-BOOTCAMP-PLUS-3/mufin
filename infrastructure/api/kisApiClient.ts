import { AccessTokenUseCase } from "@/application/usecases/kis/AccessTokenUseCase";
import { IAccessTokenUseCase } from "@/application/usecases/kis/interfaces/IAccessTokenUseCase";
import { env } from "@/config/env";
import { NextResponse } from "next/server";

const kisAccessTokenUseCase: IAccessTokenUseCase = new AccessTokenUseCase();
const KISAccessToken = await kisAccessTokenUseCase.execute();

async function executeKISRequest(
  endpoint: string,
  params: URLSearchParams,
  trId: string
) {
  if (!KISAccessToken) {
    return NextResponse.json(
      { error: "KISAccessToken not found in cookies" },
      { status: 400 }
    );
  }

  const url = `${env.KIS_API_URL}${endpoint}`;

  const response = await fetch(`${url}?${params.toString()}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      authorization: `Bearer ${KISAccessToken}`,
      appkey: env.KIS_APP_KEY!,
      appsecret: env.KIS_APP_SECRET!,
      tr_id: trId,
      custtype: "P",
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`KIS API 호출 실패: ${errorText}`);
  }
  return response.json();
}

/**
 * 주식 가격 데이터를 조회하는 함수.
 * 엔드포인트: "uapi/domestic-stock/v1/quotations/inquire-price"
 * 거래 ID: "FHKST01010100"
 * @param symbol 주식 종목 코드
 * @returns 가격 데이터 JSON
 */
export async function fetchKISPrice(symbol: string) {
  const endPoint = `/uapi/domestic-stock/v1/quotations/inquire-daily-itemchartprice`;

  const params = new URLSearchParams({
    FID_COND_MRKT_DIV_CODE: "J",
    FID_INPUT_ISCD: symbol,
  });

  const trId = "FHKST01010100";

  return await executeKISRequest(endPoint, params, trId);
}

/**
 * 주식 분봉(차트) 가격 데이터를 조회하는 함수.
 * 엔드포인트: "uapi/domestic-stock/v1/quotations/inquire-time-itemchartprice"
 * 거래 ID: "FHKST01010100" (필요 시 분봉 전용 tr_id로 변경)
 * @param symbol 주식 종목 코드
 * @param formattedTime 시간 포맷 문자열 (예: "152000")
 * @returns 분봉 가격 데이터 JSON
 */
export async function fetchKISMinChart(symbol: string, formattedTime: string) {
  const endPoint = `/uapi/domestic-stock/v1/quotations/inquire-time-itemchartprice`;

  const params = new URLSearchParams({
    FID_ETC_CLS_CODE: "",
    FID_COND_MRKT_DIV_CODE: "J",
    FID_INPUT_ISCD: symbol,
    FID_INPUT_HOUR_1: formattedTime,
    FID_PW_DATA_INCU_YN: "N",
  });

  const trId = "FHKST03010200";

  return await executeKISRequest(endPoint, params, trId);
}

export async function fetchKISStockChart(
  symbol: string,
  stockOpenDate: string,
  currentDate: string,
  activePeriod: string
) {
  const endPoint = `/uapi/domestic-stock/v1/quotations/inquire-daily-itemchartprice`;

  const params = new URLSearchParams({
    FID_COND_MRKT_DIV_CODE: "J",
    FID_INPUT_ISCD: symbol,
    FID_INPUT_DATE_1: stockOpenDate,
    FID_INPUT_DATE_2: currentDate,
    FID_PERIOD_DIV_CODE: activePeriod,
    FID_ORG_ADJ_PRC: "1",
  });

  const trId = "FHKST03010100";

  return await executeKISRequest(endPoint, params, trId);
}
