import { OrderBookContaier } from '@/app/(anon)/stock/[symbol]/components/StockDetail.Styled';
import React from 'react';

export interface StockOrderBookProps{
    symbol: string;
}

const StockOrderBook = () => {
  return (
    <OrderBookContaier>
      <h3>호가창</h3>
      <p>호가창 기능이 구현될 예정입니다.</p>
    </OrderBookContaier>
  );
};

export default StockOrderBook;