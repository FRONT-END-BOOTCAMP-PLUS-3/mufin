'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import {
  TabMenu,
  TabItem,
  ButtonComponenet,
  StockRenderTabContent,
} from '@/app/(anon)/stock/[symbol]/components/StockDetail.Styled';

import StockChart from '@/app/(anon)/stock/[symbol]/components/StockChart';
import StockInfo from '@/app/(anon)/stock/[symbol]/components/StockInfo';
import StockOrderBook from '@/app/(anon)/stock/[symbol]/components/StockOrderBook';
import StockModalContainer from '@/app/(anon)/stock/[symbol]/components/StockModalContainer';
import { marketOpen } from '@/utils/getMarketOpen';
import Button from '@/app/components/button/Button';

type TabType = 'chart' | 'orderbook' | 'info';

interface StockDetailTabsProps {
  symbol: string;
  initialPrice: string;
}

const StockDetailTabs = ({ symbol, initialPrice }: StockDetailTabsProps) => {
  const [activeTab, setActiveTab] = useState<TabType>('chart');
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleTabClick = (tab: TabType) => {
    setActiveTab(tab);
    router.push(`/stock/${symbol}?tab=${tab}`);
  };

  const handleTradeClick = () => {
    if (!marketOpen()) {
      setIsModalOpen(true);
    } else {
      router.push(`/user/tradeaction?symbol=${symbol}&initialPrice=${initialPrice}&type=buy`);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'chart':
        return <StockChart symbol={symbol} />;
      case 'orderbook':
        return <StockOrderBook />;
      case 'info':
        return <StockInfo symbol={symbol} />;
      default:
        return null;
    }
  };

  return (
    <>
    <StockModalContainer isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
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
      <StockRenderTabContent>
        {renderTabContent()}
      </StockRenderTabContent>
      <ButtonComponenet>
        <Button onClick={handleTradeClick}>거래하기</Button>
      </ButtonComponenet>
    </>
  );
};

export default StockDetailTabs;
