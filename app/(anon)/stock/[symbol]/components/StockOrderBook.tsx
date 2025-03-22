import LoadingScreen from "@/app/(anon)/stock/[symbol]/components/LodingScreen";
import {
  OrderBar,
  OrderBookContainer,
  OrderBookTable,
  OrderDetails,
  OrderRow,
  Price,
  Volume,
} from "@/app/(anon)/stock/[symbol]/components/OrderBook.Styled";
import { OrderBookResponseDto } from "@/application/usecases/kis/dtos/OrderBookResponseDto";
import { marketOpen } from "@/utils/getMarketOpen";
import React, { useEffect, useState } from "react";
import OrderBookDataComponent from "@/app/(anon)/stock/[symbol]/components/OrderBookDataComponent";

export interface StockOrderBookProps {
  symbol: string;
}

const StockOrderBook = ({ symbol }: StockOrderBookProps) => {
  const [data, setData] = useState<{
    askPrices: { [key: string]: string };
    bidPrices: { [key: string]: string };
    askVolumes: { [key: string]: string };
    bidVolumes: { [key: string]: string };
    totalAskVolume: string;
    totalBidVolume: string;
  } | null>(null);

  const [isMarketOpen, setIsMarketOpen] = useState<boolean>(marketOpen());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/stock/order_book?symbol=${symbol}`);
        const result = await response.json();
        if (response.ok) {
          setData(result);
        } else {
          console.error("Error fetching data:", result.message);
        }
      } catch (error) {
        console.error("API 요청 실패:", error);
      }
    };
    fetchData();
  }, [symbol]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsMarketOpen(marketOpen());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const handleDataUpdate = (orderBookResponse: OrderBookResponseDto) => {
    setData(orderBookResponse);
  };

  if (!data) {
    return <LoadingScreen />;
  }

  // 📌 숫자로 변환 (NaN 방지)
  const askPrices = Object.values(data.askPrices).map(
    (price) => parseInt(price) || 0
  );
  const bidPrices = Object.values(data.bidPrices).map(
    (price) => parseInt(price) || 0
  );

  const totalAskVolume = parseFloat(data.totalAskVolume) || 0;
  const totalBidVolume = parseFloat(data.totalBidVolume) || 0;

  const askVolumes = Object.values(data.askVolumes).map(
    (volume) => parseFloat(volume) || 0
  );
  const bidVolumes = Object.values(data.bidVolumes).map(
    (volume) => parseFloat(volume) || 0
  );

  // 📌 UI에서 천 단위 콤마 적용하는 함수
  const formatNumber = (num: number) => num.toLocaleString();

  return (
    <>
      <OrderBookContainer>
        <OrderBookTable>
          {[...Array(12)].map((_, i) => (
            <OrderRow key={i}>
              {/* 📌 매도 호가 (상단 6개) */}
              {i < 6 ? (
                <>
                  <Price className="ask">
                    {formatNumber(askPrices[5 - i])} 원
                  </Price>
                  <OrderDetails>
                    <OrderBar
                      $className="ask"
                      width={(askVolumes[5 - i] / totalAskVolume) * 100 || 0}
                    />
                    <Volume $className="ask">
                      {formatNumber(askVolumes[5 - i])}(
                      {((askVolumes[5 - i] / totalAskVolume) * 100).toFixed(2)}
                      %)
                    </Volume>
                  </OrderDetails>
                </>
              ) : null}

              {/* 📌 매수 호가 (하단 6개) */}
              {i >= 6 ? (
                <>
                  <Price className="bid">
                    {formatNumber(bidPrices[i - 6])} 원
                  </Price>
                  <OrderDetails>
                    <OrderBar
                      $className="bid"
                      width={(bidVolumes[i - 6] / totalBidVolume) * 100 || 0}
                    />
                    <Volume $className="bid">
                      {formatNumber(bidVolumes[i - 6])}(
                      {((bidVolumes[i - 6] / totalBidVolume) * 100).toFixed(2)}
                      %)
                    </Volume>
                  </OrderDetails>
                </>
              ) : null}
            </OrderRow>
          ))}
        </OrderBookTable>
      </OrderBookContainer>
      {isMarketOpen && (
        <OrderBookDataComponent symbol={symbol} onDataUpdate={handleDataUpdate} />
      )}
    </>
  );
};

export default StockOrderBook;
