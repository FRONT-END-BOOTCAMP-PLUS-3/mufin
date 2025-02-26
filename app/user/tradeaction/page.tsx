// app/user/tradeaction/page.tsx (서버 컴포넌트 방식)
import { BuySellTabs } from "@/app/user/tradeaction/components/BuySellTabs";
import TradeActionClient from "@/app/user/tradeaction/components/TradeActionClient";

// 서버에서 URL 쿼리 파라미터를 가져와서 컴포넌트에 props로 전달
export default async function TradeActionPage({
  searchParams,
}: {
  searchParams: { s: string; initialPrice: string };
}) {
  const symbol = searchParams.s || "";
  const initialPrice = Number(searchParams.initialPrice) || 0;

  // symbol이 없으면 리다이렉트 처리 (서버에서 수행)
  if (!symbol) {
    // 리다이렉트할 경우 페이지 내에서 처리 불가능, 클라이언트에서 리다이렉트 처리해야 할 수도 있습니다.
    return <div>잘못된 요청입니다.</div>; 
  }

  return (
    <div>
      <BuySellTabs />
      <TradeActionClient symbol={symbol} initialPrice={initialPrice} />
    </div>
  );
}
