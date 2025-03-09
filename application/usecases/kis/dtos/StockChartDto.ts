export interface StockChartDto {
    stckBsopDate: string;       // 전일 대비
    stckCntgHour?: string;      // 주식 체결 시간
    stckOprc: string;           // 전일 대비율
    stckHgpr: string;           // 주식 전일 종가
    stckLwpr: string;           // 누적 거래량
    stckClpr?: string;           // 전일 대비 부호
    stckPrpr?: string;          // 주식 현재가
}