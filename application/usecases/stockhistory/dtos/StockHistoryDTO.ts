// dtos/StockHistoryDTO.ts
export interface StockHistoryDTO {
  stockId: number;
  historyQty: number | null; 
  price: number | null; 
  transactionType: string;
  createdAt: string; 
  stockName: string;
}
