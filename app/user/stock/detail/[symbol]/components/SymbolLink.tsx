import Link from "next/link";

export const SymbolLink = ({ symbol }: { symbol: string }) => {
  const encodedSymbol = encodeURIComponent(symbol);

  return (
    <Link href={`/user/stock/detail/${encodedSymbol}`}>
      {symbol} 상세 페이지
    </Link>
  );
};
