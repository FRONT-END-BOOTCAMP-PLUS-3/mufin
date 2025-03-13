export interface OrderBookResponseDto {
    askPrices: {
      askp1: string;
      askp3: string;
      askp5: string;
      askp7: string;
      askp9: string;
      askp10: string;
    };
    bidPrices: {
      bidp1: string; 
      bidp3: string;
      bidp5: string;
      bidp7: string;
      bidp9: string;
      bidp10: string;
    };
    askVolumes: {
      askpRsqn1: string; 
      askpRsqn3: string;
      askpRsqn5: string;
      askpRsqn7: string;
      askpRsqn9: string;
      askpRsqn10: string;
    };
    bidVolumes: {
      bidpRsqn1: string; 
      bidpRsqn3: string;
      bidpRsqn5: string;
      bidpRsqn7: string;
      bidpRsqn9: string;
      bidpRsqn10: string;
    };
    totalAskVolume: string; 
    totalBidVolume: string; 
  }
  