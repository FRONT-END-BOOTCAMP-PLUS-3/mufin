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

const TradeActionClient = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const symbol = searchParams.get("s") || "";
  const initialPriceValue = Number(searchParams.get("initialPrice")) || 0;
  const type = searchParams.get("type") || "buy";

  const [quantity, setQuantity] = useState<number | undefined>(undefined);
  const [activeTab, setActiveTab] = useState<string>(type);
  const [isModalOpen, setIsModalOpen] = useState(false); 

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setActiveTab(type);

    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [type]);

  if (!symbol) {
    return <div>잘못된 요청입니다.</div>;
  }

  const finalAmount = (quantity || 0) * initialPriceValue;
  const buttonLabel = activeTab === "buy" ? "구매하기" : "판매하기";

  const handleTabClick = (tabType: string) => {
    setActiveTab(tabType);
    router.push(`?s=${symbol}&initialPrice=${initialPriceValue}&type=${tabType}`);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ""); // 숫자만 입력 허용
    setQuantity(value ? parseInt(value, 10) : undefined);
  };

  const handleKeypadClick = (num: number) => {
    setQuantity((prev) => parseInt(`${prev || ""}${num}`, 10));
  };  

  const handleDelete = () => {
    setQuantity((prev) => Math.floor((prev || 0) / 10));
  };

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
          <button className="delete" onClick={handleDelete}><Delete size={20} color="black"/></button>
        </div>
      </QuantityControl>

      <MainButton as="button" onClick={openModal} $isBuy={activeTab === "buy"} disabled={quantity === undefined || quantity <= 0}>
        {buttonLabel}
      </MainButton>

      <Modal 
        isOpen={isModalOpen} 
        onClose={closeModal}
      >
        <OrderDetailsModalContent 
          type={activeTab} 
          symbol={symbol} 
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
