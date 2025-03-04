import { InfoItem, InfoList, ModalButton, ModalContainer, SubTitle, Title, TotalPrice } from "@/app/user/tradeaction/components/Trandeaction.Styled";
import React, { useEffect, useState } from "react";

interface OrderDetailsModalContentProps {
  type: string; // 매매 타입 (buy 또는 sell)
  symbol: string; // 주식 코드
  quantity: number; // 구매/판매 갯수
  price: number; // 한 주 가격
  totalAmount: number; // 총 가격
}
interface OrderDetailsModalData {
  stockName: string;
}

const OrderDetailsModalContent = ({
  type,
  symbol,
  quantity,
  price,
  totalAmount,
}: OrderDetailsModalContentProps) => {
  const isBuy = type === "buy";

  const handleTrade = () => {
    // TODO : 거래 API 호출 
    console.log("거래 실행!"); 
  };

  const [stockName, setStockName] = useState<string | null>(null);
  
    useEffect(() => {
      // 주식 이름 가져오는 API 호출
      const fetchStockName = async () => {
        try {
          const response = await fetch(`/api/stock/${symbol}`);
          if (!response.ok) {
            throw new Error('주식 데이터를 불러오는 데 실패했습니다.');
          }
  
          const data: OrderDetailsModalData = await response.json();
          setStockName(data.stockName);
        } catch (error) {
          console.error('Error fetching stock name:', error);
        }
      };
  
      fetchStockName();
    }, [symbol]);

  return (
    <ModalContainer>
      <Title>{stockName ?? symbol}</Title>
      <SubTitle $isBuy={isBuy}>
        <span className="quantity">{quantity}주</span> 
        <span className="action">{isBuy ? "구매" : "판매"}</span>
      </SubTitle>
      <InfoList>
        <InfoItem>
          <span>1주 가격</span>
          <span>{price.toLocaleString()}원</span>
        </InfoItem>
        <TotalPrice>
          <span>총 주문 금액</span>
          <span>{totalAmount.toLocaleString()}원</span>
        </TotalPrice>
      </InfoList>
      <ModalButton as="button" onClick={handleTrade} $isBuy={isBuy}>
        {isBuy ? "구매하기" : "판매하기"}
      </ModalButton>
    </ModalContainer>
  );
};

export default OrderDetailsModalContent;
