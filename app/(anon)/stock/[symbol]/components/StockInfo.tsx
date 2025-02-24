'use client';

import React from 'react';

interface StockInfoProps {
  symbol: string;
}

const StockInfo = ({ symbol }: StockInfoProps) => {
  return (
    <>
      <div>
        <p>여기에 {symbol} 종목 관련 정보 표시</p>
      </div>
    </>
  );
};

export default StockInfo;
