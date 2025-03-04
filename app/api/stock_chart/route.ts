import { StockInfoUseCase } from "@/application/usecases/stock/StockInfoUseCase";
import { env } from "@/config/env";
import { PrStockRepository } from "@/infrastructure/repositories/PrStockRepository";
import { getAccessToken } from "@/utils/kisAccessToken";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const kisaccesstoken = await getAccessToken();

    if (!kisaccesstoken) {
      return NextResponse.json({ error: "kisaccesstoken not found in cookies" }, { status: 400 });
    }

    const url = `${env.KIS_API_URL}/uapi/domestic-stock/v1/quotations/inquire-daily-itemchartprice`;
    
    const getCurrentDate = (): string => {
        const today = new Date();
        const year = today.getFullYear();
        const month = (today.getMonth() + 1).toString().padStart(2, '0');
        const day = today.getDate().toString().padStart(2, '0');
      
        return `${year}${month}${day}`;
    };

    // 요청된 symbol과 activePeriod 추출
    const queryParams = new URL(req.url).searchParams;
    const symbol = queryParams.get('symbol') || '';
    const activePeriod = queryParams.get('activePeriod') || '';

    const stockRepository = new PrStockRepository();
    const stockUsecase = new StockInfoUseCase(stockRepository);

    const stockData = await stockUsecase.getStockInfoByCode(symbol);
    if (!stockData || !stockData.stockOpen) {
      return NextResponse.json({ error: '상장일 정보를 찾을 수 없습니다.' }, { status: 404 });
    }

    const stockOpenDate = stockData.stockOpen;

    const params = new URLSearchParams({
      FID_COND_MRKT_DIV_CODE: 'J',
      FID_INPUT_ISCD: symbol,
      FID_INPUT_DATE_1: stockOpenDate,
      FID_INPUT_DATE_2: getCurrentDate(),
      FID_PERIOD_DIV_CODE: activePeriod,
      FID_ORG_ADJ_PRC: '1',
    });

    const response = await fetch(`${url}?${params.toString()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'authorization': `Bearer ${kisaccesstoken}`,
        'appkey': process.env.KIS_APP_KEY!,
        'appsecret': process.env.KIS_APP_SECRET!,
        'tr_id': 'FHKST03010100',
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
