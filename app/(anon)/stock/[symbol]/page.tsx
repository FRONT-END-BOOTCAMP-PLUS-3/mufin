import React from "react";
import StockDetailTabs from "@/app/(anon)/stock/[symbol]/components/StockDetailTabs";
import StockDetailTitle from "@/app/(anon)/stock/[symbol]/components/StockDetailTitle";

interface Props {
  params: { symbol: string }; 
}

const stockDetailPage = async ({ params }: Props) => {
  const { symbol } = await params; 

  // TODO: 현재가 받아오기
  const initialPrice = 77777;

  if (!symbol) {
    return <p>잘못된 요청입니다.</p>;
  }

  const decodedSymbol = decodeURIComponent(symbol); 

  return (
    <div>
      <StockDetailTitle symbol={decodedSymbol} initialPrice={initialPrice} />
      <StockDetailTabs symbol={decodedSymbol} initialPrice={initialPrice}/>
    </div>
  );
};

export default stockDetailPage;
