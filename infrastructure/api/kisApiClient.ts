import { env } from "@/config/env";
import { NextResponse } from "next/server";
import { kisAPIDi } from "@/infrastructure/config/kisApiDi";

async function executeKISRequest(
  endpoint: string,
  trId: string,
  params?: URLSearchParams,
  
) {
  const url = params?.toString()
  ? `${env.KIS_API_URL}${endpoint}?${params.toString()}`
  : `${env.KIS_API_URL}${endpoint}`;

 let KISAccessToken = await kisAPIDi.accessTokenUseCase.execute();
  
 if (!KISAccessToken) 
    return NextResponse.json(
      { error: "KISAccessToken not found in cookies" }, { status: 400 }
    );

  let response = await fetch(`${url}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      authorization: `Bearer ${KISAccessToken}`,
      appkey: env.KIS_APP_KEY_1!,
      appsecret: env.KIS_APP_SECRET_1!,
      tr_id: trId,
      custtype: "P",
    },
  });

  let data = await response.json();

  if (
    !response.ok ||
    (data.rt_cd === "1" &&
      data.msg1 &&
      data.msg1.includes("기간이 만료된 token"))
  ) {
    if (data.msg1 && data.msg1.includes("기간이 만료된 token")) {
      
      KISAccessToken = await kisAPIDi.renewAccessToken.execute();

      // 새로운 토큰으로 재요청
      response = await fetch(`${url}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          authorization: `Bearer ${KISAccessToken}`,
          appkey: env.KIS_APP_KEY_1!,
          appsecret: env.KIS_APP_SECRET_1!,
          tr_id: trId,
          custtype: "P",
        },
      });
      data = await response.json();

      if (!response.ok) {
        throw new Error(`KIS API 재호출 실패: ${JSON.stringify(data)}`);
      }
    } else {
      throw new Error(`KIS API 호출 실패: ${JSON.stringify(data)}`);
    }
  }
  return data;
}

/**
 * 주식 가격 데이터를 조회하는 함수.
 * 엔드포인트: "uapi/domestic-stock/v1/quotations/inquire-daily-itemchartprice"
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

  return await executeKISRequest(endPoint, trId, params );
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

  return await executeKISRequest(endPoint, trId, params );
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

  return await executeKISRequest(endPoint, trId, params );
}

export async function fetchKISOrderBook(symbol: string) {
  const endPoint = `/uapi/domestic-stock/v1/quotations/inquire-asking-price-exp-ccn`;

  const params = new URLSearchParams({
    FID_COND_MRKT_DIV_CODE: "J",
    FID_INPUT_ISCD: symbol,
  });

  const trId = "FHKST01010200";

  return await executeKISRequest(endPoint, trId, params );
}

export async function fetchKISCheckRanks() {
  const enePoint = `/uapi/domestic-stock/v1/ranking/fluctuation`;

  const params = new URLSearchParams({
    fid_rsfl_rate2:"",
    fid_cond_mrkt_div_code: "J",
    fid_cond_scr_div_code	: "20170",
    fid_input_iscd	 : "0001",
    fid_rank_sort_cls_code: "0",
    fid_input_cnt_1	 : "0",
    fid_prc_cls_code	: "1",
    fid_input_price_1	: "",
    fid_input_price_2	: "",
    fid_vol_cnt	: "",
    fid_trgt_cls_code: "0",
    fid_trgt_exls_cls_code: "0",
    fid_div_cls_code: "0",
    fid_rsfl_rate1: "",
  });

  const trID ="FHPST01700000";
  
  return await executeKISRequest(enePoint, trID, params);
}