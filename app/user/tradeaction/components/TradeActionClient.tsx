"use client";

import React, { useState, useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  TabsContainer,
  Tab,
  FormContainer,
  PriceText,
  QuantityControl,
  TrandeacionContainer,
  MainButton,
  QuantityControlTitle,
} from "@/app/user/tradeaction/components/Trandeaction.Styled";

import OrderDetailsModalContent from "@/app/user/tradeaction/components/OrderDetailsModalContent";
import Modal from "@/app/components/modal/Modal";

import { Delete } from 'lucide-react';

interface StockData {
  stockId: number;
  stockName: string;
}

const TradeActionClient = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const symbol = searchParams.get("symbol") || "";
  const initialPriceValue = Number(searchParams.get("initialPrice")) || 0;
  const type = searchParams.get("type") || "buy";

  const [quantity, setQuantity] = useState<number | undefined>(undefined);
  const [activeTab, setActiveTab] = useState<string>(type);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [walletBalance, setWalletBalance] = useState<number | null>(null);
  const [portfolioQuantity, setPortfolioQuantity] = useState<number | null>(null);

  const userId = "505fd959-f473-4d94-9f09-479334d50b9a"; 

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setActiveTab(type);

    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [type]);
  
  const [stockId, setStockId] = useState<number | null>(null);
  const [stockName, setStockName] = useState<string | null>(null);

  useEffect(() => {
    console.log("useEffect 실행됨, symbol 값:", symbol);
  
    if (!symbol) {
      console.log("Symbol이 없어서 fetch하지 않음");
      return;
    }
  
    const fetchStockIdName = async () => {
      try {
        console.log("API 호출 전");
        const response = await fetch(`/api/stock/${symbol}`);
        if (!response.ok) {
          throw new Error('주식 데이터를 불러오는 데 실패했습니다.');
        }
  
        const data: StockData = await response.json();
        console.log("Stock ID and Name:", data);
        setStockId(data.stockId);
        setStockName(data.stockName);
      } catch (error) {
        console.error('Error fetching stock name:', error);
      }
    };
  
    fetchStockIdName();
  }, [symbol]);

  useEffect(() => {
    const fetchWalletAndPortfolio = async () => {
      if (stockId === null) {
        return; // stockId가 없으면 API 호출하지 않음
      }
      
      try {
        // 유저 ID를 포함해서 API 호출
        const walletResponse = await fetch(`/api/wallet?userId=${userId}`);
        const walletData = await walletResponse.json();
        setWalletBalance(walletData.cash);
  
        const portfolioResponse = await fetch(`/api/portfolio?stockId=${stockId}&userId=${userId}`);
        const portfolioData = await portfolioResponse.json();
        setPortfolioQuantity(portfolioData.quantity);
      } catch (error) {
        console.error("데이터 로딩 실패:", error);
      }
    };
  
    fetchWalletAndPortfolio();
  }, [stockId, userId]);

  if (!symbol) {
    return <div>잘못된 요청입니다.</div>;
  }

  const finalAmount = (quantity || 0) * initialPriceValue;
  const buttonLabel = activeTab === "buy" ? "구매하기" : "판매하기";

  const handleTabClick = (tabType: string) => {
    setActiveTab(tabType);
    router.push(`?symbol=${symbol}&initialPrice=${initialPriceValue}&type=${tabType}`);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    setQuantity(value ? parseInt(value, 10) : undefined);
  };

  const handleKeypadClick = (num: number) => {
    setQuantity((prev) => parseInt(`${prev || ""}${num}`, 10));
  };  

  const handleDelete = () => {
    setQuantity((prev) => Math.floor((prev || 0) / 10));
  };

  const isBuyDisabled = activeTab === "buy" && (walletBalance === null || walletBalance < finalAmount);

  const isSellDisabled = activeTab === "sell" && (portfolioQuantity === null || portfolioQuantity < (quantity ?? 0));


  return (
    <div>
      <TrandeacionContainer>
      {/* Buy/Sell Tabs */}
      <TabsContainer>
        <Tab $active={activeTab === "buy"} onClick={() => handleTabClick("buy")}>
          구매
        </Tab>
        <Tab $active={activeTab === "sell"} onClick={() => handleTabClick("sell")}>
          판매
        </Tab>
      </TabsContainer>

      {/* Order Form */}
      <FormContainer>
        <label>{activeTab === "buy" ? "구매할" : "판매할"} 가격</label>
        <PriceText>주당 {initialPriceValue.toLocaleString()}원</PriceText>
      </FormContainer>

      <QuantityControlTitle>
      <div className="row-container">
        <p className="label">수량</p>
        <input
          type="number"
          value={quantity ?? ""}
          onChange={handleInputChange}
          placeholder="몇 주 구매할까요?"
          ref={inputRef}
        />
      </div>
      <p className="label2">총 {finalAmount.toLocaleString()}원</p>
      </QuantityControlTitle>

      <QuantityControl>
        <div className="keypad">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button key={num} onClick={() => handleKeypadClick(num)}>
              {num}
            </button>
          ))}
          <button onClick={() => handleKeypadClick(0)}>00</button>
          <button onClick={() => handleKeypadClick(0)}>0</button>
          <button onClick={handleDelete}><Delete size={20} color="black"/></button>
        </div>
      </QuantityControl>

      <MainButton 
        as="button" 
        onClick={openModal} 
        $isBuy={activeTab === "buy"} 
        disabled={quantity === undefined || quantity <= 0 || isBuyDisabled || isSellDisabled}
      >
        {buttonLabel}
      </MainButton>

      <Modal 
        isOpen={isModalOpen} 
        onClose={closeModal}
      >
        <OrderDetailsModalContent 
          type={activeTab} 
          userId={userId}
          stockId={stockId || 0} 
          stockName={stockName || ""}
          quantity={quantity ?? 1} 
          price={initialPriceValue} 
          totalAmount={finalAmount} 
        />
      </Modal>
      </TrandeacionContainer>
    </div>
  );
};

export default TradeActionClient;
