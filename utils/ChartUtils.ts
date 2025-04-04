// src/utils/chartUtils.ts
import { StockChartDto } from '@/application/usecases/kis/dtos/StockChartDto';

export interface CandlestickItem {
  x: Date;
  o: number;
  h: number;
  l: number;
  c: number;
}

export interface ChartData {
  datasets: {
    label: string;
    data: CandlestickItem[];
    barThickness?: number;
  }[];
}

const parseDate = (dateStr: string, timeStr?: string): Date => {
  const year = parseInt(dateStr.substring(0, 4), 10);
  const month = parseInt(dateStr.substring(4, 6), 10) - 1;
  const day = parseInt(dateStr.substring(6, 8), 10);
  if (timeStr) {
    const hours = parseInt(timeStr.substring(0, 2), 10);
    const minutes = parseInt(timeStr.substring(2, 4), 10);
    const seconds = parseInt(timeStr.substring(4, 6), 10);
    return new Date(year, month, day, hours, minutes, seconds);
  }
  return new Date(year, month, day);
};

export const createCandlestickItem = (
  item: StockChartDto,
  activePeriod: string
): CandlestickItem => {
  const date = parseDate(item.stckBsopDate, activePeriod === '1m' ? item.stckCntgHour : undefined);
  return {
    x: date,
    o: Number(item.stckOprc),
    h: Number(item.stckHgpr),
    l: Number(item.stckLwpr),
    c: Number(activePeriod === '1m' ? item.stckPrpr : item.stckClpr),
  };
};

export function transformStockChartData(
  rawData: StockChartDto[],
  symbol: string,
  activePeriod: string
): ChartData {
  const candlestickData: CandlestickItem[] = rawData.map((item) =>
    createCandlestickItem(item, activePeriod)
  ).filter(Boolean);;

  return {
    datasets: [
      {
        label: `${symbol} 봉 차트`,
        data: candlestickData,
        barThickness: 7,
      },
    ],
  };
}
