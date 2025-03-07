"use client";
import React, { useState } from "react";
import StockDataComponent from "@/app/(anon)/stock/[symbol]/components/StockDataComponent";
import StockDetailTitle from "@/app/(anon)/stock/[symbol]/components/StockDetailTitle";
import StockDetailTabs from "@/app/(anon)/stock/[symbol]/components/StockDetailTabs";
import { StockContainer } from "@/app/(anon)/stock/[symbol]/components/StockDetail.Styled";

interface StockClientProps {
  symbol: string;
}

const StockClientPage: React.FC<StockClientProps> = ({ symbol }) => {
  const [stockPrice, setStockPrice] = useState<string>("N/A");
  const [prdyVrss, setPrdyVrss] = useState<string>("N/A");
  const [prdyCtrt, setPrdyCtrt] = useState<string>("N/A");

  const handleDataUpdate = (data: { stockPrice: string, prdyVrss: string, prdyCtrt: string }) => {
    setStockPrice(data.stockPrice);
    setPrdyVrss(data.prdyVrss);
    setPrdyCtrt(data.prdyCtrt);
  };

  return (
    <div>
      <StockContainer>
        <StockDetailTitle
          symbol={symbol}
          initialPrice={stockPrice}
          prdyVrss={prdyVrss}
          prdyCtrt={prdyCtrt}
        />
        <StockDetailTabs symbol={symbol} initialPrice={stockPrice} />
      </StockContainer>
      <StockDataComponent 
        symbol={symbol} 
        onDataUpdate={handleDataUpdate} 
      />
    </div>
  );
};

export default StockClientPage;
