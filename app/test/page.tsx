"use client";
import React, { useEffect, useState, useRef } from "react";
import {
  connectWs,
  sendWsMessage,
  onWsMessage,
  disconnectWs,
  createMessage,
} from "@/utils/websocketClient";
import { fetchApprovalKey } from "@/utils/fetchApprovalKey";
import { parseStockData } from "@/utils/parseStockData";

const wsPath = "/tryitout/H0STCNT0";

const StockDataComponent: React.FC = () => {
  const [stockData, setStockData] = useState<Record<string, string>>({
    stockPrice: "N/A",
    highPrice: "N/A",
    lowPrice: "N/A",
    prdyVrssSign: "N/A",
    prdyVrss: "N/A",
    prdyCtrt: "N/A",
  });
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

        // 브라우저 내장 WebSocket을 사용합니다.
        const ws = await connectWs(wsPath);
        wsRef.current = ws;

        const subscribeMsg = createMessage(
          approvalKey,
          "1",
          "H0STCNT0",
          "034730"
        );
        sendWsMessage(ws, subscribeMsg);

        onWsMessage(ws, (data: string) => {
          try {
            const parsedData = parseStockData(data);
            if (parsedData) {
              console.log("✅ 파싱된 데이터 객체:", parsedData);
              setStockData(parsedData.stocks); // `.stocks` 배열만 저장
            }
          } catch (error) {
            console.error("❌ 데이터 파싱 실패:", error);
          }
        });
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
          "005930"
        );
        sendWsMessage(wsRef.current, unsubscribeMsg);
        disconnectWs(wsRef.current);
      }
    };
  }, []);

  return (
    <div>
      <h1>실시간 주식 데이터</h1>
      {stockData ? (
        <ul>
          {Object.entries(stockData).map(([key, value]) => (
            <li key={key}>
              <strong>{key}:</strong> {value}
            </li>
          ))}
        </ul>
      ) : (
        <p>데이터 수신 대기중...</p>
      )}
    </div>
  );
};

export default StockDataComponent;
