"use client";
import React, { useEffect, useRef } from "react";
import {
  connectWs,
  sendWsMessage,
  onWsMessage,
  disconnectWs,
  createMessage,
} from "@/utils/websocketClient";
import { fetchApprovalKey } from "@/utils/fetchApprovalKey";
import { parseStockData } from "@/utils/parseStockData";

interface StockDataComponentProps {
  symbol: string;
  onDataUpdate: (data: { stockPrice: string, prdyVrss: string, prdyCtrt: string }) => void;
}

const StockDataComponent: React.FC<StockDataComponentProps> = ({
  symbol,
  onDataUpdate,
}) => {
  const approvalKeyRef = useRef<string | null>(null);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    async function initWebSocket() {
      try {
        const approvalKey = await fetchApprovalKey();
        if (!approvalKey) {
          throw new Error("Approval Key 없음");
        }
        approvalKeyRef.current = approvalKey;

        const ws = await connectWs("/tryitout/H0STCNT0");
        wsRef.current = ws;

        const subscribeMsg = createMessage(
          approvalKey,
          "1",
          "H0STCNT0",
          symbol // symbol을 동적으로 전송
        );
        if (wsRef.current) {
          sendWsMessage(wsRef.current, subscribeMsg);
        }

        if (wsRef.current) {
          onWsMessage(wsRef.current, (data: string) => {
          try {
            const parsedData = parseStockData(data);
            if (parsedData) {
              onDataUpdate({
                stockPrice: parsedData.stocks.stckPrpr,
                prdyVrss: parsedData.stocks.prdyVrss,
                prdyCtrt: parsedData.stocks.prdyCtrt,
              });
            }
          } catch (error) {
            console.error("❌ 데이터 파싱 실패:", error);
          }
        });
      }
      } catch (error) {
        console.error("WebSocket 초기화 에러:", error);
      }
    }

    initWebSocket();

    return () => {
      if (wsRef.current && approvalKeyRef.current) {
        const unsubscribeMsg = createMessage(
          approvalKeyRef.current,
          "2",
          "H0STCNT0",
          symbol // 동일하게 symbol 사용
        );
        sendWsMessage(wsRef.current, unsubscribeMsg);
        disconnectWs(wsRef.current);
      }
    };
  }, [symbol, onDataUpdate]); // symbol과 onDataUpdate가 변경되면 재연결

  // 화면에 데이터를 출력하지 않도록 JSX 부분 삭제
  return null;
};

export default StockDataComponent;
