import Link from "next/link";

export const SymbolLink = ({ symbol }: { symbol: string }) => {
  // 한국어 symbol을 URL-safe한 형식으로 인코딩
  const encodedSymbol = encodeURIComponent(symbol);

  return (
    <Link href={`/user/stock/detail/${encodedSymbol}`}>
      {symbol} 상세 페이지
    </Link>
  );
};
