"use client"

import { HistoryContainer, HistoryHeader, HistoryTable, HistoryTabItem, HistoryTabMenu, Td, Th, Tr, HistoryTrem, NoDataContainer, NoDataText } from "@/app/user/stockhistory/components/StockHistory.Styled";
import { ChevronDown } from "lucide-react";
import React, { useState, useEffect } from "react";

interface Transaction {
  createdAt : string;
  stockName: string;
  historyQty : number;
  transactionType : "BUY" | "SELL";
  price: number;
}

const fetchTransactionHistory = async (): Promise<Transaction[]> => {
  try {
    const response = await fetch("/api/stockhistory");
    console.log("Response status:", response.status);
    if (!response.ok) {
      throw new Error("Failed to fetch transaction history");
    }

    const data = await response.json();
    console.log("Fetched Data:", data);  // 응답 데이터를 콘솔에 출력

    // 'history' 키 안의 배열을 반환
    return Array.isArray(data.history) ? data.history : [];
  } catch (error) {
    console.error("Error fetching transaction history:", error);
    return [];
  }
};

const StockHistoryList = () => {
  const [transactionType, setTransactionType] = useState("ALL");
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // 컴포넌트 마운트 시 데이터 불러오기
  useEffect(() => {
    const getTransactions = async () => {
      const data = await fetchTransactionHistory();
      setTransactions(data);
    };
    getTransactions();
  }, []);

  // 선택한 거래 유형에 맞는 데이터 필터링
  const filteredTransactions =
    transactionType === "ALL"
      ? transactions
      : transactions.filter((t) => t.transactionType === transactionType);

  return (
    <HistoryContainer>
      <HistoryHeader>
        <HistoryTabMenu>
          <HistoryTabItem
            $active={transactionType === "ALL"}
            onClick={() => setTransactionType("ALL")}
          >
            전체
          </HistoryTabItem>
          <HistoryTabItem
            $active={transactionType === "BUY"}
            onClick={() => setTransactionType("BUY")}
          >
            매수
          </HistoryTabItem>
          <HistoryTabItem
            $active={transactionType === "SELL"}
            onClick={() => setTransactionType("SELL")}
          >
            매도
          </HistoryTabItem>
        </HistoryTabMenu>
      </HistoryHeader>

      <HistoryTrem>
        3월 내역 <ChevronDown size={15} />
      </HistoryTrem>
      <HistoryTable>
        <thead>
          <tr>
            <Th>거래일</Th>
            <Th>주식 이름</Th>
            <Th>구매 주수</Th>
            <Th>주당 가격</Th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((t, index) => (
              <Tr key={index}>
                <Td>{t.createdAt}</Td>
                <Td>{t.stockName}</Td>
                <Td>{`${t.historyQty} 주 ${
                  t.transactionType === "BUY" ? "매수" : t.transactionType === "SELL" ? "매도" : t.transactionType
                }`}</Td>
                <Td>{t.price.toLocaleString()} 원</Td>
              </Tr>
            ))
          ) : (
            <tr>
              <Td colSpan={4} style={{ textAlign: "center" }}>
                <NoDataContainer>
                  <NoDataText>선택한 거래 내역이 없습니다.</NoDataText>
                </NoDataContainer>
              </Td>
            </tr>
          )}
        </tbody>
      </HistoryTable>
    </HistoryContainer>
  );
};

export default StockHistoryList;
