"use client"

import CustomDropdown from "@/app/user/stockhistory/components/CustomDropdown";
import { HistoryContainer, HistoryHeader, HistoryTable, HistoryTabItem, HistoryTabMenu, Td, Th, Tr, NoDataContainer, NoDataText } from "@/app/user/stockhistory/components/StockHistory.Styled";
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
    const response = await fetch("/api/stock_history");
    console.log("Response status:", response.status);
    if (!response.ok) {
      throw new Error("Failed to fetch transaction history");
    }

    const data = await response.json();
    console.log("Fetched Data:", data);  

    return Array.isArray(data.history) ? data.history : [];
  } catch (error) {
    console.error("Error fetching transaction history:", error);
    return [];
  }
};

const StockHistoryList = () => {
  const [transactionType, setTransactionType] = useState("ALL");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<string | "ALL">("ALL");

  useEffect(() => {
    const getTransactions = async () => {
      const data = await fetchTransactionHistory();
      setTransactions(data);
    };
    getTransactions();
  }, []);

  // 거래 내역이 있는 월만 추출
  const availableMonths = Array.from(
    new Set(transactions.map((t) => t.createdAt.slice(0, 7))) // "YYYY-MM" 형태로 저장
  ).sort((a, b) => b.localeCompare(a)); // 최신 월이 위로 오도록 정렬

  // 거래 유형 및 월별 필터링
  const filteredTransactions = transactions.filter((t) => {
    const matchesType = transactionType === "ALL" || t.transactionType === transactionType;
    const matchesMonth = selectedMonth === "ALL" || t.createdAt.startsWith(selectedMonth);
    return matchesType && matchesMonth;
  });

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
      
      <CustomDropdown availableMonths={availableMonths} selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} />

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
                <Td>{`${t.historyQty} 주 ${t.transactionType === "BUY" ? "매수" : "매도"}`}</Td>
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
