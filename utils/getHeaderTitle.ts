"use client"
import { useParams, useSearchParams } from "next/navigation";

import { CATEGORY_MAP, ROUTE_HEADER_MAP } from "@/constants/routeMap";

export const useGetHeaderTitle = (pathname: string): string => {
  const searchParams = useSearchParams();
  const params = useParams();
  const symbol = params.symbol as string | undefined;

  let title = ROUTE_HEADER_MAP[pathname] || "";

  // `/stock/detail?t=삼성전자`
  if (pathname === `/stock/${symbol}`) {
    title= "주식 상세"

  }

  // `/stock?c=자동차`
  if (pathname === "/category") {
    const param = searchParams.get("c");
    if (param) {
      const c = parseInt(param, 10);
      title = CATEGORY_MAP[c] ?? "주식 목록";
    } else {
      title = "주식 목록";
    }
  }

  return title;
};