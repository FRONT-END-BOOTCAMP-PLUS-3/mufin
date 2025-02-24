import React from "react";
import StockDetailTabs from "@/app/(anon)/stock/[symbol]/components/StockDetailTabs";
import StockDetailTitle from "@/app/(anon)/stock/[symbol]/components/StockDetailTitle";

interface Props {
  params: { symbol: string }; 
}

const stockDetailPage = async ({ params }: Props) => {
  const { symbol } = await params; 

  if (!symbol) {
    return <p>잘못된 요청입니다.</p>;
  }

  const decodedSymbol = decodeURIComponent(symbol); 

  return (
    <div>
      <StockDetailTitle symbol={decodedSymbol} />
      <StockDetailTabs symbol={decodedSymbol} />
    </div>
  );
};

export default stockDetailPage;
