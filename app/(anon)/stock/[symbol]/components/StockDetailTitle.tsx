"use client";

import React from "react";

import {
  StockInfo,
  StockName,
  StockPrice,
  StockDiff
} from '@/app/(anon)/stock/[symbol]/components/StockDetail.Styled';

interface StockDetailTitleProps {
  symbol: string;
  initialPrice: number;
}

export default function StockDetailTitle({ symbol, initialPrice }: StockDetailTitleProps) {
  return (
      <StockInfo>
        <StockName>{symbol}</StockName>
        <StockPrice>{initialPrice.toLocaleString()}원</StockPrice>
        {/* TODO: 현재가, 전일대비 소켓으로 받아오기 */}
        <StockDiff>
          어제보다 <span>+315원 (1.9%)</span>
        </StockDiff>
      </StockInfo>
  );
}
