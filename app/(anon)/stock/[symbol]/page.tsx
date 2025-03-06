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
  
  // fetchStockData 유틸 함수를 사용하여 주식 데이터를 가져옵니다.
  const stockData = await fetchCurrentStockData(symbol);

  console.log(stockData);

  return (
    <div>
      <StockClient
        symbol={symbol}
        stockPrice={stockData.stck_prpr || ""}
        prdyVrss={stockData.prdy_vrss || ""}
        prdyCtrt={stockData.prdy_ctrt || ""}
      />
    </div>
  );
}

export default StockDetailPage;