"use client";
import React, { useCallback, useEffect, useRef } from "react";
import { connectWs, sendWsMessage, onWsMessage, disconnectWs, createMessage } from "@/utils/websocketClient";
import { fetchApprovalKey } from "@/utils/fetchApprovalKey";
import { parseStockData } from "@/utils/parseStockData";
import { ApprovalKeyType } from "@/types/approvalKeyType";
import { REQUIRED_STOCK_FIELD, STOCK_TRADE_MAPPING } from "@/constants/realTimeStockMapping";

interface StockDataComponentProps {
  symbol: string;
  onDataUpdate: (data: { stockPrice: string, prdyVrss: string, prdyCtrt: string }) => void;
}

const StockDataComponent: React.FC<StockDataComponentProps> = ({ symbol, onDataUpdate }) => {
  
  // approvalKeyRef: 승인키를 저장하는 ref (웹소켓 연결 시 사용)
  const approvalKeyRef = useRef<string | null>(null);
  // usedApiKeyNameRef: 실제 사용된 API 키의 별칭(환경변수 이름)을 저장하는 ref
  const usedApiKeyNameRef = useRef<string | null>(null);
   // wsRef: WebSocket 인스턴스를 저장하는 ref
  const wsRef = useRef<WebSocket | null>(null);
   // isConnectedRef: WebSocket 연결 상태를 추적 (중복 연결 방지)
  const isConnectedRef = useRef<boolean>(false);
  
  // 현재 사용할 승인키 타입 (예: "currentPrice")
  const currentType: ApprovalKeyType = "currentPrice";

  const initializeConnections = useCallback(async () => {
    
    if(isConnectedRef.current) return;

    try{
      // "start" 상태로 승인키를 요청
      const result = await fetchApprovalKey(currentType, "start");
      console.log(result);

      
      if (!result) throw new Error("Approval Key 없음");
      
      // 받아온 결과에서 approvalKey와 usedApiKeyName 추출
      const { approvalKey, usedApiKeyName } = result as { approvalKey: string; usedApiKeyName: string };
      approvalKeyRef.current = approvalKey;
      usedApiKeyNameRef.current = usedApiKeyName;

      // Websocket 연결
      const ws = await connectWs("ws://ops.koreainvestment.com:21000/tryitout/H0STCNT0");
      wsRef.current = ws;
      isConnectedRef.current = true;

      // 구독 메시지 생성 및 전송: 승인키, 메시지 타입("1"은 구독 요청), 채널, 동적 symbol 포함
      const subscribeMsg = createMessage(approvalKey, "1", "H0STCNT0", symbol);
      
      //wsRef.current가 null이 아닐 때만 sendWsMessage를 호출하여, 연결되지 않은 상태에서 발생할 수 있는 에러를 방지
      if (wsRef.current) {
        sendWsMessage(wsRef.current, subscribeMsg);

        onWsMessage(wsRef.current, (data: string) => {
          try {
            const parsedData = parseStockData(data ,STOCK_TRADE_MAPPING, REQUIRED_STOCK_FIELD );
            if (parsedData) {
              onDataUpdate({
                stockPrice: parsedData.stocks.stckPrpr,
                prdyVrss: parsedData.stocks.prdyVrss,
                prdyCtrt: parsedData.stocks.prdyCtrt,
              });
            }
          } catch (error) {
            console.log("❌ 데이터 파싱 실패:", error);
          }
        });
      }
    } catch (error){
      console.log("WebSocket 초기화 에러:", error);
    }
  }, [symbol])

  const cleanupConnection = useCallback(() => {
    if (wsRef.current && approvalKeyRef.current && usedApiKeyNameRef.current) {
      
      // 구독 해제 메시지를 생성합니다. ("2"는 구독 해제 요청)
      const unsubscribeMsg = createMessage(approvalKeyRef.current, "2", "H0STCNT0",symbol);
      // WebSocket 연결이 유효할 때만 구독 해제 메시지를 전송합니다.
      if (wsRef.current) {
        sendWsMessage(wsRef.current, unsubscribeMsg);
      }
      
      // WebSocket 연결 종료
      disconnectWs(wsRef.current);
      isConnectedRef.current = false; // 연결 상태 초기화

      fetchApprovalKey(currentType, "stop", usedApiKeyNameRef.current).catch((error) => console.error("Approval Key release 실패:", error));
    }
  }, [symbol, currentType]);

  useEffect(() => {
    // 컴포넌트 마운트 시 WebSocket 연결 초기화
    initializeConnections();

    const handleBeforeUnload = () => cleanupConnection();
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      // 컴포넌트 언마운트 시 cleanup 함수 실행
      cleanupConnection();
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [initializeConnections, cleanupConnection]);

  return null;
};

export default StockDataComponent;
