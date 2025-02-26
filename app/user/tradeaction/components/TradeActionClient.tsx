"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  TabsContainer,
  Tab,
  FormContainer,
  PriceText,
  QuantityControl,
  SummaryContainer,
} from "@/app/user/tradeaction/Trandeaction.Styled";

import OrderDetailsModalContent from "@/app/user/tradeaction/components/OrderDetailsModalContent"; // OrderDetailsModalContent import
import Modal from "@/app/components/Modal";

const TradeActionClient = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const symbol = searchParams.get("s") || "";
  const initialPriceValue = Number(searchParams.get("initialPrice")) || 0;
  const type = searchParams.get("type") || "buy";

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<string>(type);
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열기/닫기 상태 관리

  // type이 바뀌면 activeTab을 업데이트
  useEffect(() => {
    setActiveTab(type);
  }, [type]);

  if (!symbol) {
    return <div>잘못된 요청입니다.</div>;
  }

  const finalAmount = quantity * initialPriceValue;
  const buttonLabel = activeTab === "buy" ? "구매하기" : "판매하기";

  // 탭 클릭 시 URL을 변경하는 함수
  const handleTabClick = (tabType: string) => {
    setActiveTab(tabType);
    router.push(`?s=${symbol}&initialPrice=${initialPriceValue}&type=${tabType}`);
  };

  // 모달 열기 함수
  const openModal = () => {
    setIsModalOpen(true);
  };

  // 모달 닫기 함수
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
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
        <label>구매할 가격</label>
        <PriceText>{initialPriceValue.toLocaleString()} 원</PriceText>
        <QuantityControl>
          <button onClick={() => setQuantity(quantity - 1)} disabled={quantity <= 1}>-</button>
          <span>{quantity} 주</span>
          <button onClick={() => setQuantity(quantity + 1)}>+</button>
        </QuantityControl>
      </FormContainer>

      {/* Order Summary */}
      <SummaryContainer>
        <p>총 주문 금액</p>
        <h2>{finalAmount.toLocaleString()} 원</h2>
        <button onClick={openModal}>{buttonLabel}</button>
      </SummaryContainer>

      <Modal 
        isOpen={isModalOpen} 
        onClose={closeModal}
      >
        <OrderDetailsModalContent 
          type={activeTab} 
          symbol={symbol} 
          quantity={quantity} 
          price={initialPriceValue} 
          totalAmount={finalAmount} 
        />
      </Modal>
    </div>
  );
};

export default TradeActionClient;
