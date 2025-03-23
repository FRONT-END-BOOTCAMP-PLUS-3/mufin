'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

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
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<TabType>('chart');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam && ['chart', 'orderbook', 'info'].includes(tabParam)) {
      setActiveTab(tabParam as TabType);
    } else {
      router.replace(`/stock/${symbol}?tab=chart`);
    }
  }, [searchParams, symbol, router]);

  const handleTabClick = (tab: TabType) => {
    setActiveTab(tab);
    router.push(`/stock/${symbol}?tab=${tab}`);
  };

  const handleTradeClick = () => {
    if (marketOpen()) {
      setIsModalOpen(true);
    } else {
      sessionStorage.setItem('initialPrice', initialPrice);
      router.push(`/user/tradeaction?symbol=${symbol}&type=buy`);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'chart':
        return <StockChart symbol={symbol} />;
      case 'orderbook':
        return <StockOrderBook symbol={symbol}/>;
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
