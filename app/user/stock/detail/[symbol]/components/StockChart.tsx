'use client';

import React from 'react';
import {
  ChartContainer,
  ChartImage,
  RedLine,
  ChartLabelTop,
  ChartLabelBottom,
  PeriodSelector,
  PeriodItem,
} from '@/app/user/stock/detail/[symbol]/stock_detail.styled';

interface StockChartProps {
  symbol: string;
}

const StockChart = ({ symbol }: StockChartProps) => {
  return (
    <>
      <h3>{symbol} 차트</h3>
      <ChartContainer>
        <ChartImage>
          {/* 임시 차트 영역 */}
          <RedLine />
          <ChartLabelTop>최고 16,280원</ChartLabelTop>
          <ChartLabelBottom>최저 13,510원</ChartLabelBottom>
        </ChartImage>
      </ChartContainer>
      <PeriodSelector>
        <PeriodItem $active>분</PeriodItem>
        <PeriodItem>일</PeriodItem>
        <PeriodItem>주</PeriodItem>
        <PeriodItem>월</PeriodItem>
      </PeriodSelector>
    </>
  );
};

export default StockChart;
