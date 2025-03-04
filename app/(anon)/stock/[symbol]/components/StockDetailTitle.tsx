"use client";

import React, { useEffect, useState } from "react";

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
interface StockTitleData {
  stockName: string;
}

export default function StockDetailTitle({ symbol, initialPrice }: StockDetailTitleProps) {
  const [stockName, setStockName] = useState<string | null>(null);

  useEffect(() => {
    // 주식 이름 가져오는 API 호출
    const fetchStockName = async () => {
      try {
        const response = await fetch(`/api/stock/${symbol}`);
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
      <StockInfo>
        <StockName>{stockName ?? symbol}</StockName>
        <StockPrice>{initialPrice.toLocaleString()}원</StockPrice>
        {/* TODO: 현재가, 전일대비 소켓으로 받아오기 */}
        <StockDiff>
          어제보다 <span>+315원 (1.9%)</span>
        </StockDiff>
      </StockInfo>
  );
}
