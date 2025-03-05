export interface HistoryDto {
    userId: string;
    stockId: number;
    quantity: number;
    price: number;
    totalAmount: number;
    transactionType: 'BUY' | 'SELL'; 
}
