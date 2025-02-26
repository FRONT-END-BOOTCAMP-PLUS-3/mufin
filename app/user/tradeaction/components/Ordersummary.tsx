import { SummaryContainer } from "@/app/user/tradeaction/Trandeaction.Styled";
import React from "react";


interface OrderSummaryProps {
  quantity: number;
  price: number;
}

export const OrderSummary = ({ quantity, price }: OrderSummaryProps) => {
  const finalAmount = quantity * price;

  return (
    <SummaryContainer>
      <p>총 주문 금액(수수료 포함)</p>
      <h2>{finalAmount.toLocaleString()} 원</h2>
    </SummaryContainer>
  );
};

  