import React from "react";
import StockDetailTabs from "@/app/(anon)/stock/[symbol]/components/StockDetailTabs";
import StockDetailTitle from "@/app/(anon)/stock/[symbol]/components/StockDetailTitle";
import { StockContainer } from "@/app/(anon)/stock/[symbol]/components/StockDetail.Styled";
interface StockClientProps {
    symbol: string;
  }

const stockClientPage = ({ symbol }: StockClientProps) => {

  // TODO: 현재가 받아오기
  const initialPrice = 77777;

  return (
    <div>
      <StockContainer>
      <StockDetailTitle symbol={symbol} initialPrice={initialPrice} />
      <StockDetailTabs symbol={symbol} initialPrice={initialPrice}/>
      </StockContainer>
    </div>
  );
};

export default stockClientPage;
