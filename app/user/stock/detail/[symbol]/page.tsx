// 페이지 컴포넌트
import React from "react";
import StockDetailTabs from "@/app/user/stock/detail/[symbol]/components/StockDetailTabs";
import StockDetailTitle from "@/app/user/stock/detail/[symbol]/components/StockDetailTitle";

interface Props {
  params: { symbol: string }; // 동적 경로에서 받아오는 params
}

// 페이지가 비동기 함수여야 합니다.
const StockDetailPage = async ({ params }: Props) => {
  // `params`는 비동기적으로 받아야 합니다.
  const { symbol } = await params; // params를 await로 처리

  if (!symbol) {
    return <p>잘못된 요청입니다.</p>;
  }

  const decodedSymbol = decodeURIComponent(symbol); // URL 디코딩
  console.log("decodedSymbol is:", decodedSymbol);


  return (
    <div>
      <StockDetailTitle symbol={decodedSymbol} />
      <StockDetailTabs symbol={decodedSymbol} />
    </div>
  );
};

export default StockDetailPage;
