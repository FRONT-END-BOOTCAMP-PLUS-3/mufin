export interface StockInfoDto {
    stockId: number;  // 주식 ID
    stockCode: string;
    stockName: string;
    stockOpen? : string;
    category?: number;
    stockImage?: string;
    faceValue : number;   
    totalShare : bigint;
  }