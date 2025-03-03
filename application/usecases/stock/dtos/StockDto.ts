export interface StockDto {
    stockId : number;        
    stockCode : string;     
    stockName : string;    
    category? : number;        
    stockImage? : string;
    stockOpen? : string;
    faceValue : number;   
    totalShare : bigint;
    createdAt : string; 
    updatedAt : string;
}