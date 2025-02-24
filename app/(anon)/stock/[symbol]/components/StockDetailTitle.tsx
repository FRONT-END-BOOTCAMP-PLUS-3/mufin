"use client";

import React from "react";
import {
  StockInfo,
  StockName,
  StockPrice,
  StockDiff
} from '@/app/(anon)/stock/[symbol]/StockDetail.Styled';

export default function StockDetailTitle({ symbol }: { symbol: string }) {
  return (
      <StockInfo>
        <StockName>{symbol}</StockName>
        <StockPrice>56,900원</StockPrice>
        <StockDiff>
          어제보다 <span>+315원 (1.9%)</span>
        </StockDiff>
      </StockInfo>
  );
}
