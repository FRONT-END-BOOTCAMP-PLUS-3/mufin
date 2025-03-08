import StockClient from "@/app/(anon)/stock/[symbol]/components/StockClient";
import { fetchCurrentStockData } from "@/utils/fetchCurrentStockData";

interface StockDetailProps {
  params: { symbol: string };
}

const StockDetailPage = async ({params}:StockDetailProps) =>  {
  const { symbol } = await params;

  if (!symbol) {
    return <p>잘못된 요청입니다.</p>;
  }
  
  const stockData = await fetchCurrentStockData(symbol);

  return (
      <StockClient
        symbol={symbol}
        stockPrice={stockData.data.stckPrpr || ""}
        prdyVrss={stockData.data.prdyVrss || ""}
        prdyCtrt={stockData.data.prdyCtrt || ""}
      />
  );
}

export default StockDetailPage;