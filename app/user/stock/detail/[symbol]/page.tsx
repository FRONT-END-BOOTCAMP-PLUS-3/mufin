import React from "react";
import StockDetailTabs from "@/app/user/stock/detail/[symbol]/components/StockDetailTabs";
import StockDetailTitle from "@/app/user/stock/detail/[symbol]/components/StockDetailTitle";

interface Props {
  params: { symbol: string }; 
}

const StockDetailPage = async ({ params }: Props) => {
  const { symbol } = await params; 

  if (!symbol) {
    return <p>잘못된 요청입니다.</p>;
  }

  const decodedSymbol = decodeURIComponent(symbol); 
  console.log("decodedSymbol is:", decodedSymbol);


  return (
    <div>
      <StockDetailTitle symbol={decodedSymbol} />
      <StockDetailTabs symbol={decodedSymbol} />
    </div>
  );
};

export default StockDetailPage;
