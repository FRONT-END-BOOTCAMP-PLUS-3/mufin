export interface StockInfoDto {
    stockCode: string;
    stockName: string;
    stockOpen? : string;
    faceValue : number;   
    totalShare : bigint;
  }