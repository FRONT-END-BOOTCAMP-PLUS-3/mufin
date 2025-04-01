"use client";
import React, { useCallback, useEffect, useRef } from "react";
import { connectWs, sendWsMessage, onWsMessage, disconnectWs, createMessage } from "@/utils/websocketClient";
import { fetchApprovalKey } from "@/utils/fetchApprovalKey";
import { parseStockData } from "@/utils/parseStockData";
import { ApprovalKeyType } from "@/types/approvalKeyType";
import { REQUIRED_STOCK_ORDERBOOK_FIELD, STOCK_TRADE_ORDERBOOK_MAPPING } from "@/constants/realTimeStockMapping";
import { OrderBookResponseDto } from "@/application/usecases/kis/dtos/OrderBookResponseDto";

interface StockDataComponentProps {
  symbol: string;
  onDataUpdate: (data:OrderBookResponseDto) => void;
}

const OrderBookDataComponent: React.FC<StockDataComponentProps> = ({ symbol, onDataUpdate }) => {
  
  // approvalKeyRef: 승인키를 저장하는 ref (웹소켓 연결 시 사용)
  const approvalKeyRef = useRef<string | null>(null);
  // usedApiKeyNameRef: 실제 사용된 API 키의 별칭(환경변수 이름)을 저장하는 ref
  const usedApiKeyNameRef = useRef<string | null>(null);
   // wsRef: WebSocket 인스턴스를 저장하는 ref
  const wsRef = useRef<WebSocket | null>(null);
   // isConnectedRef: WebSocket 연결 상태를 추적 (중복 연결 방지)
  const isConnectedRef = useRef<boolean>(false);

  // 현재 사용할 승인키 타입 (예: "orderBook")
  const currentType: ApprovalKeyType = "orderBook";

  const initializeConnections = useCallback(async () => {
    if(isConnectedRef.current) return;

    try{
      // "start" 상태로 승인키를 요청
      const result = await fetchApprovalKey(currentType, "start");
      if (!result) throw new Error("Approval Key 없음");

      // 받아온 결과에서 approvalKey와 usedApiKeyName 추출
      const { approvalKey, usedApiKeyName } = result as { approvalKey: string; usedApiKeyName: string };
      approvalKeyRef.current = approvalKey;
      usedApiKeyNameRef.current = usedApiKeyName;

      // OrderBook 전용 WebSocket 연결 (URL 및 채널 "H0STASP0")
      const ws = await connectWs("wss://mufin.newlecture.com/api31000//tryitout/H0STASP0");
      wsRef.current = ws;
      isConnectedRef.current = true;

      // 구독 메시지 생성: 승인키, 메시지 타입 "1" (구독 요청), 채널 "H0STASP0", symbol 전달
      const subscribeMsg = createMessage(approvalKey, "1", "H0STASP0", symbol);

      //wsRef.current가 null이 아닐 때만 sendWsMessage를 호출하여, 연결되지 않은 상태에서 발생할 수 있는 에러를 방지
      if (wsRef.current) {
        sendWsMessage(wsRef.current, subscribeMsg);

        onWsMessage(wsRef.current, (data: string) => {
          try {
            const parsedData = parseStockData(data, STOCK_TRADE_ORDERBOOK_MAPPING, REQUIRED_STOCK_ORDERBOOK_FIELD );
            if (parsedData) {
              onDataUpdate({
                askPrices: {
                  askp1: parsedData.stocks.askp1,
                  askp3: parsedData.stocks.askp3,
                  askp5: parsedData.stocks.askp5,
                  askp7: parsedData.stocks.askp7,
                  askp9: parsedData.stocks.askp9,
                  askp10: parsedData.stocks.askp10,
                },
                bidPrices: {
                  bidp1: parsedData.stocks.bidp1,
                  bidp3: parsedData.stocks.bidp3,
                  bidp5: parsedData.stocks.bidp5,
                  bidp7: parsedData.stocks.bidp7,
                  bidp9: parsedData.stocks.bidp9,
                  bidp10: parsedData.stocks.bidp10,
                },
                askVolumes: {
                  askpRsqn1: parsedData.stocks.askpRsqn1,
                  askpRsqn3: parsedData.stocks.askpRsqn3,
                  askpRsqn5: parsedData.stocks.askpRsqn5,
                  askpRsqn7: parsedData.stocks.askpRsqn7,
                  askpRsqn9: parsedData.stocks.askpRsqn9,
                  askpRsqn10: parsedData.stocks.askpRsqn10,
                },
                bidVolumes: {
                  bidpRsqn1: parsedData.stocks.bidpRsqn1,
                  bidpRsqn3: parsedData.stocks.bidpRsqn3,
                  bidpRsqn5: parsedData.stocks.bidpRsqn5,
                  bidpRsqn7: parsedData.stocks.bidpRsqn7,
                  bidpRsqn9: parsedData.stocks.bidpRsqn9,
                  bidpRsqn10: parsedData.stocks.bidpRsqn10,
                },
                totalAskVolume: parsedData.stocks.totalAskpRsqn,
                totalBidVolume: parsedData.stocks.totalBidpRsqn,
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
  }, [symbol]);

  const cleanupConnection = useCallback(() => {
    if (wsRef.current && approvalKeyRef.current && usedApiKeyNameRef.current) {
      // 구독 해제 메시지 생성 (메시지 타입 "2"는 구독 해제 요청)
      const unsubscribeMsg = createMessage(approvalKeyRef.current, "2", "H0STASP0", symbol);
      // WebSocket 연결이 유효한 경우 구독 해제 메시지 전송
      if (wsRef.current) {
        sendWsMessage(wsRef.current, unsubscribeMsg);
      }
      // WebSocket 연결 종료 및 연결 상태 초기화
      disconnectWs(wsRef.current);
      isConnectedRef.current = false;

      // "stop" 상태로 승인키 해제 요청 전송
      fetchApprovalKey(currentType, "stop", usedApiKeyNameRef.current).catch((error) =>
        console.error("Approval Key release 실패:", error)
      );
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

export default OrderBookDataComponent;
