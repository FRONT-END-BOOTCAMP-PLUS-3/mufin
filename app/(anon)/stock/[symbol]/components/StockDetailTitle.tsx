"use client";

import React, { useEffect, useState } from "react";
import {
  StockName,
  StockPrice,
  StockDiff,
  StockTitleWrapper,
} from "@/app/(anon)/stock/[symbol]/components/StockDetail.Styled";

export interface StockDetailTitleProps {
  symbol: string;
  initialPrice: string;
  prdyVrss: string; 
  prdyCtrt: string;
}

interface StockTitleData {
  stockName: string;
}

export default function StockDetailTitle({
  symbol,
  initialPrice,
  prdyVrss,
  prdyCtrt,
}: StockDetailTitleProps) {
  const [stockName, setStockName] = useState<string | null>(null);

  const isPositive = (value: string) => parseFloat(value) > 0;

  useEffect(() => {
    // 주식 이름 가져오는 API 호출
    const fetchStockName = async () => {
      try {
        const response = await fetch(`/api/stock/stock_info?symbol=${symbol}`);
        if (!response.ok) {
          throw new Error('주식 데이터를 불러오는 데 실패했습니다.');
        }

        const data: StockTitleData = await response.json();
        setStockName(data.stockName);
      } catch (error) {
        console.error('Error fetching stock name:', error);
      }
    };

    fetchStockName();
  }, [symbol]);

  return (
    <StockTitleWrapper>
      <StockName>{stockName ?? symbol}</StockName>
      <StockPrice>{parseInt(initialPrice).toLocaleString()}원</StockPrice>
      <StockDiff>
        어제보다 <span
        style={{
          color: isPositive(prdyVrss) ? "red" : "blue",
        }}
      >
        {isPositive(prdyVrss) && "+"}{prdyVrss}
        ({isPositive(prdyCtrt) && "+"}
        {prdyCtrt}%)
      </span>
      </StockDiff>
    </StockTitleWrapper>
  );
}