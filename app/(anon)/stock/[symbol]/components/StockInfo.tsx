'use client';

import { StockInfoWrapper, Table, TableCell1, TableCell2 } from '@/app/(anon)/stock/[symbol]/components/StockDetail.Styled';
import React, { useState, useEffect } from 'react';

interface StockInfoProps {
  symbol: string;
}

interface StockInfoData {
  stockCode: string;
  stockName: string;
  stockOpen: string;
  faceValue: number;
  totalShare: bigint;
}

// 데이터 처리 및 표시
const StockInfo = ({ symbol }: StockInfoProps) => {
  const [stockData, setStockData] = useState<
    Array<{ label: string; value: string | number }>
  >([]);

  useEffect(() => {
    // 데이터 가져오는 부분
    const fetchStockData = async () => {
      try {
        const response = await fetch(`/api/stock/stock_info?symbol=${symbol}`);
        if (!response.ok) {
          throw new Error('주식 데이터를 불러오는 데 실패했습니다.');
        }

        const data: StockInfoData = await response.json();
        
        const transformedData = [
          { label: '주식이름', value: data.stockName },
          { label: '주식코드', value: data.stockCode },
          { label: '상장일', value: data.stockOpen },
          { label: '상장 주수', value: data.totalShare.toString() }, // bigint 타입은 문자열로 변환
          { label: '액면가', value: `${data.faceValue}원`},
        ];

        setStockData(transformedData);
      } catch (error) {
        console.error('Error fetching stock data:', error);
      }
    };

    fetchStockData();
  }, [symbol]);

  return (
    <StockInfoWrapper>
      <Table>
        <tbody>
          {stockData.map((row, index) => (
            <tr key={index}>
              <TableCell1>{row.label}</TableCell1>
              <TableCell2>{row.value}</TableCell2>
            </tr>
          ))}
        </tbody>
      </Table>
    </StockInfoWrapper>
  );
};

export default StockInfo;