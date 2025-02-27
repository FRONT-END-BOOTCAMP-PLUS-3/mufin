import StockClient from "@/app/(anon)/stock/[symbol]/components/StockClient";
import React from "react";

interface Props {
  params: { symbol: string }; 
}

const StockDetailPage = async ({ params }: Props) => {
  const { symbol } = await params;

  if (!symbol) {
    return <p>잘못된 요청입니다.</p>;
  }

  const decodedSymbol = decodeURIComponent(symbol); 

  return (
    <div>
      <StockClient symbol={decodedSymbol} />
    </div>
  );
};

export default StockDetailPage;

