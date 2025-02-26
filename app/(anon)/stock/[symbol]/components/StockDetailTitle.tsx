"use client";

import React from "react";

import {
  StockInfo,
  StockName,
  StockPrice,
  StockDiff
} from '@/app/(anon)/stock/[symbol]/StockDetail.Styled';

interface StockDetailTitleProps {
  symbol: string;
  initialPrice: number;
}

export default function StockDetailTitle({ symbol, initialPrice }: StockDetailTitleProps) {
  return (
      <StockInfo>
        <StockName>{symbol}</StockName>
        <StockPrice>{initialPrice.toLocaleString()}원</StockPrice>
        <StockDiff>
          어제보다 <span>+315원 (1.9%)</span>
        </StockDiff>
      </StockInfo>
  );
}
