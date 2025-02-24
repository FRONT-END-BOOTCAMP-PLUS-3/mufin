'use client';

import React, { useState } from 'react';

import {
  TabMenu,
  TabItem,
  TradeButton,
} from '@/app/(anon)/stock/[symbol]/stock_detail.styled';

import StockChart from '@/app/(anon)/stock/[symbol]/components/StockChart';
import StockInfo from '@/app/(anon)/stock/[symbol]/components/StockInfo';

type TabType = 'chart' | 'orderbook' | 'info';

interface StockDetailTabsProps {
  symbol: string;
}

const StockDetailTabs = ({ symbol }: StockDetailTabsProps) => {
  const [activeTab, setActiveTab] = useState<TabType>('chart');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'chart':
        return <StockChart symbol={symbol} />;
      case 'orderbook':
        return (
          <div>
            <p>여기에 호가창 내용 렌더링</p>
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
          onClick={() => setActiveTab('chart')}
        >
          차트
        </TabItem>
        <TabItem
          $active={activeTab === 'orderbook'}
          onClick={() => setActiveTab('orderbook')}
        >
          호가
        </TabItem>
        <TabItem
          $active={activeTab === 'info'}
          onClick={() => setActiveTab('info')}
        >
          종목정보
        </TabItem>
      </TabMenu>
      {renderTabContent()}
      <TradeButton>거래하기</TradeButton>
      </>
  );
};

export default StockDetailTabs;
