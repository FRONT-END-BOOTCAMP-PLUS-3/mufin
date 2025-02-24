"use client"
import { useSearchParams } from "next/navigation";

import { ROUTE_HEADER_MAP } from "@/constants/routeMap";

export const useGetHeaderTitle = (pathname: string): string => {
  const searchParams = useSearchParams();
  let title = ROUTE_HEADER_MAP[pathname] || "";

  // `/stock/detail?t=삼성전자`
  if (pathname === "/stock/detail") {
    title = searchParams.get("t") || "주식 상세";
  }

  // `/stock?c=자동차`
  if (pathname === "/stock") {
    title = searchParams.get("c") || "주식 목록";
  }

  return title;
};