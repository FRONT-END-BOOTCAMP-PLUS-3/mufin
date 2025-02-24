"use client";

import React from "react";
import {
  Container,
  StockInfo,
  StockName,
  StockPrice,
  StockDiff
} from '@/app/user/stock/detail/[symbol]/stock_detail.styled';

export default function StockDetailTitle({ symbol }: { symbol: string }) {
  console.log("Symbol is:", symbol);

  return (
    <Container>
      <StockInfo>
        <StockName>{symbol}</StockName>
        <StockPrice>56,900원</StockPrice>
        <StockDiff>
          어제보다 <span>+315원 (1.9%)</span>
        </StockDiff>
      </StockInfo>
    </Container>
  );
}
