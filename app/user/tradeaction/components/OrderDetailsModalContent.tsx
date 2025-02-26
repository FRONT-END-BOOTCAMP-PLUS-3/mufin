import React from "react";

interface OrderDetailsModalContentProps {
  type: string; // 매매 타입 (buy 또는 sell)
  symbol: string; // 주식 코드
  quantity: number; // 구매/판매 갯수
  price: number; // 한 주 가격
  totalAmount: number; // 총 가격
}

const OrderDetailsModalContent = ({
  type,
  symbol,
  quantity,
  price,
  totalAmount,
}: OrderDetailsModalContentProps) => {
  return (
    <div>
      <h2>{type === "buy" ? "구매 정보" : "판매 정보"}</h2>
      <p>매매 타입: {type === "buy" ? "구매" : "판매"}</p>
      <p>주식 코드: {symbol}</p>
      <p>구매 갯수: {quantity} 주</p>
      <p>한 주 가격: {price.toLocaleString()} 원</p>
      <p>총 가격: {totalAmount.toLocaleString()} 원</p>
    </div>
  );
};

export default OrderDetailsModalContent;
