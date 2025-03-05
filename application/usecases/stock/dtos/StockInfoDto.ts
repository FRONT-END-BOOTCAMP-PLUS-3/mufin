export interface StockInfoDto {
    stockId: number;  // 주식 ID
    stockCode: string;
    stockName: string;
    stockOpen? : string;
    faceValue : number;   
    totalShare : bigint;
  }