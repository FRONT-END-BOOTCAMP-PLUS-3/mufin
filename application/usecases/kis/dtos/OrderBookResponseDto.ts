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
      askp_rsqn1: string; 
      askp_rsqn3: string;
      askp_rsqn5: string;
      askp_rsqn7: string;
      askp_rsqn9: string;
      askp_rsqn10: string;
    };
    bidVolumes: {
      bidp_rsqn1: string; 
      bidp_rsqn3: string;
      bidp_rsqn5: string;
      bidp_rsqn7: string;
      bidp_rsqn9: string;
      bidp_rsqn10: string;
    };
    totalAskVolume: string; 
    totalBidVolume: string; 
  }
  