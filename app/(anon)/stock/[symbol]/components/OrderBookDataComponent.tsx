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
import { ApprovalKeyType } from "@/types/approvalKeyType";
import { REQUIRED_STOCK_ORDERBOOK_FIELD, STOCK_TRADE_ORDERBOOK_MAPPING } from "@/constants/realTimeStockMapping";
import { OrderBookResponseDto } from "@/application/usecases/kis/dtos/OrderBookResponseDto";

interface StockDataComponentProps {
  symbol: string;
  onDataUpdate: (data:OrderBookResponseDto) => void;
}

const OrderBookDataComponent: React.FC<StockDataComponentProps> = ({
  symbol,
  onDataUpdate,
}) => {
  const approvalKeyRef = useRef<string | null>(null);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    async function initWebSocket() {
      try {
        const currentType: ApprovalKeyType = "orderBook";
        const approvalKey = await fetchApprovalKey(currentType);
        if (!approvalKey) {
          throw new Error("Approval Key 없음");
        }
        approvalKeyRef.current = approvalKey;

        const ws = await connectWs("ws://ops.koreainvestment.com:31000/tryitout/H0STASP0");
        wsRef.current = ws;

        const subscribeMsg = createMessage(
          approvalKey,
          "1",
          "H0STASP0",
          symbol // symbol을 동적으로 전송
        );
        if (wsRef.current) {
          sendWsMessage(wsRef.current, subscribeMsg);
        }

        if (wsRef.current) {
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
      } catch (error) {
        console.log("WebSocket 초기화 에러:", error);
      }
    }

    initWebSocket();

    return () => {
      if (wsRef.current && approvalKeyRef.current) {
        const unsubscribeMsg = createMessage(
          approvalKeyRef.current,
          "2",
          "H0STASP0",
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

export default OrderBookDataComponent;
