'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import {
  TabMenu,
  TabItem,
  ButtonComponenet,
} from '@/app/(anon)/stock/[symbol]/components/StockDetail.Styled';

import StockChart from '@/app/(anon)/stock/[symbol]/components/StockChart';
import StockInfo from '@/app/(anon)/stock/[symbol]/components/StockInfo';
import Button from '@/app/components/button/Button';

type TabType = 'chart' | 'orderbook' | 'info';

interface StockDetailTabsProps {
  symbol: string;
  initialPrice: string;
}

const StockDetailTabs = ({ symbol, initialPrice }: StockDetailTabsProps) => {
  const [activeTab, setActiveTab] = useState<TabType>('chart');
  const router = useRouter();  // useRouter 훅 사용

  const handleTabClick = (tab: TabType) => {
    setActiveTab(tab);
    router.push(`/stock/${symbol}?tab=${tab}`);  // tab을 쿼리 파라미터로 업데이트
  };

  const handleTradeClick = () => {
    router.push(`/user/tradeaction?s=${symbol}&initialPrice=${initialPrice}&type=buy`);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'chart':
        return <StockChart symbol={symbol} />;
      case 'orderbook':
        return (
          <div>
            <p>개발중인 서비스 입니다</p>
          </div>
        );
      case 'info':
        return <StockInfo symbol={symbol} />;
      default:
        return null;
    }
  };

  return (
    <>
      <TabMenu>
        <TabItem
          $active={activeTab === 'chart'}
          onClick={() => handleTabClick('chart')}
        >
          차트
        </TabItem>
        <TabItem
          $active={activeTab === 'orderbook'}
          onClick={() => handleTabClick('orderbook')}
        >
          호가
        </TabItem>
        <TabItem
          $active={activeTab === 'info'}
          onClick={() => handleTabClick('info')}
        >
          종목정보
        </TabItem>
      </TabMenu>
      {renderTabContent()}
      <ButtonComponenet>
        <Button onClick={handleTradeClick}>거래하기</Button>
      </ButtonComponenet>
    </>
  );
};

export default StockDetailTabs;
