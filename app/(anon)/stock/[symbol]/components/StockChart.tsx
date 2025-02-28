'use client';

// 005930 (삼성전자)
// 000660 (SK hynix)
// 035420 (NAVER)
// 051910 (LG화학)
// 207940 (삼성바이오로직스)
// 005380 (현대차)
// 068270 (셀트리온)
// 000270 (기아)
// 003550 (LG전자)
// 034730 (카카오)

import React, { useState, useEffect } from 'react';
import {
  ChartContainer,
  PeriodSelector,
  PeriodItem,
} from '@/app/(anon)/stock/[symbol]/components/StockDetail.Styled';
import StockChartImage from '@/app/(anon)/stock/[symbol]/components/StockChartImage';


interface StockChartProps {
  symbol: string;
}

const StockChart = ({ symbol }: StockChartProps) => {
  const [activePeriod, setActivePeriod] = useState<string>('1m'); 

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const period = queryParams.get('p');
    if (period) {
      setActivePeriod(period);
    }
  }, []);

  const handlePeriodClick = (period: string) => {
    setActivePeriod(period);

    const queryString = new URLSearchParams(window.location.search);
    queryString.set('p', period);
    window.history.replaceState(null, '', `?${queryString.toString()}`);
  };

  return (
    <>
      <ChartContainer>
        <StockChartImage symbol={symbol} activePeriod={activePeriod} />
      </ChartContainer>
      <PeriodSelector>
        <PeriodItem $active={activePeriod === '1m'} onClick={() => handlePeriodClick('1m')}>
          1분
        </PeriodItem>
        <PeriodItem $active={activePeriod === 'D'} onClick={() => handlePeriodClick('D')}>
          일
        </PeriodItem>
        <PeriodItem $active={activePeriod === 'W'} onClick={() => handlePeriodClick('W')}>
          주
        </PeriodItem>
        <PeriodItem $active={activePeriod === 'M'} onClick={() => handlePeriodClick('M')}>
          월
        </PeriodItem>
        <PeriodItem $active={activePeriod === 'Y'} onClick={() => handlePeriodClick('Y')}>
          년
        </PeriodItem>
      </PeriodSelector>
    </>
  );
};

export default StockChart;
