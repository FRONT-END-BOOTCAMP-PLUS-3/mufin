'use client';

import React, { useState } from 'react';
import {
  ChartContainer,
  ChartImage,
  ChartLabelTop,
  ChartLabelBottom,
  PeriodSelector,
  PeriodItem,
} from '@/app/(anon)/stock/[symbol]/StockDetail.Styled';

interface StockChartProps {
  symbol: string;
}

const StockChart = ({ symbol }: StockChartProps) => {
  const [activePeriod, setActivePeriod] = useState<string>('분'); 
  // 탭 클릭 시 활성화된 탭 상태 업데이트
  const handlePeriodClick = (period: string) => {
    setActivePeriod(period);
  };

  return (
    <>
      <h3>{symbol} 차트</h3>
      <ChartContainer>
        <ChartImage>
          <ChartLabelTop>최고 16,280원</ChartLabelTop>
          <ChartLabelBottom>최저 13,510원</ChartLabelBottom>
        </ChartImage>
      </ChartContainer>
      <PeriodSelector>
        <PeriodItem $active={activePeriod === '분'} onClick={() => handlePeriodClick('분')}>
          분
        </PeriodItem>
        <PeriodItem $active={activePeriod === '일'} onClick={() => handlePeriodClick('일')}>
          일
        </PeriodItem>
        <PeriodItem $active={activePeriod === '주'} onClick={() => handlePeriodClick('주')}>
          주
        </PeriodItem>
        <PeriodItem $active={activePeriod === '월'} onClick={() => handlePeriodClick('월')}>
          월
        </PeriodItem>
        <PeriodItem $active={activePeriod === '년'} onClick={() => handlePeriodClick('년')}>
          년
        </PeriodItem>
      </PeriodSelector>
    </>
  );
};

export default StockChart;
