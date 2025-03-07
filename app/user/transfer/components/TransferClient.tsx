"use client";

import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import {
  FormContainer,
  QuantityControl,
  TrandeacionContainer,
  QuantityControlTitle,
  WalletError,
} from "@/app/user/transfer/components/TransferClient.Styled";

import Button from "@/app/components/button/Button";
import { useRouter } from "next/navigation";


const TransferClient = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const type = searchParams.get("type");

  const [amount, setAmount] = useState<number | undefined>(undefined);
  const [balances, setBalances] = useState<{ cash: number; account: number }>({
    cash: 0,
    account: 0,
  });

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }

    const fetchBalances = async () => {
      try {
        const response = await fetch("/api/transfer");
        const data = await response.json();
        console.log("잔액 정보:", data);
        setBalances({ cash: Number(data.cash), account: Number(data.account) });
      } catch (error) {
        console.error("잔액 정보를 불러오는 중 오류 발생:", error);
      }
    };

    fetchBalances();
  }, []);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    setAmount(value ? parseInt(value, 10) : undefined);
  };

  const handleDelete = () => {
    setAmount((prev) => Math.floor((prev || 0) / 10));
  };

  const handleTransfer = async () => {
    if (!amount || amount <= 0) return;
  
    try {
      const response = await fetch("/api/transfer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, type }),
      });
  
      const result = await response.json();
  
      if (!response.ok) throw new Error(result.message);
  
      alert(`${type === "toCash" ? "주식계좌로" : "기본계좌로"} 송금 성공!`);
  
      router.push("/test"); 
    } catch (error) {
      if (error instanceof Error) {
        alert(`${type === "toCash" ? "주식계좌로" : "기본계좌로"} 송금 실패: ${error.message}`);
      } else {
        alert(`${type === "toCash" ? "주식계좌로" : "기본계좌로"} 송금 실패: 알 수 없는 오류`);
      }
    }
  };

  const isTransferDisabled =
    (type === "toCash" && (balances.account < (amount ?? 0))) || 
    (type === "toAccount" && (balances.cash < (amount ?? 0))); 

  return (
    <>
      <TrandeacionContainer>
        <FormContainer>
          <QuantityControlTitle>
            <p>이체할 금액</p>
            <input
              type="number"
              value={amount ?? ""}
              onChange={handleInputChange}
              placeholder="송금 금액 입력"
              ref={inputRef}
            />
            <p>
              현재 잔액: {type === "toCash" ? balances.account : balances.cash} 원
            </p>
          </QuantityControlTitle>

          {isTransferDisabled && <WalletError>잔액이 부족합니다.</WalletError>}
        </FormContainer>

        {/* 키패드 */}
        <QuantityControl>
          <div className="keypad">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <button key={num} onClick={() => setAmount((prev) => parseInt(`${prev || ""}${num}`, 10))}>
                {num}
              </button>
            ))}
            <button onClick={() => setAmount((prev) => parseInt(`${prev || ""}00`, 10))}>00</button>
            <button onClick={() => setAmount((prev) => parseInt(`${prev || ""}0`, 10))}>0</button>
            <button onClick={handleDelete}>⌫</button>
          </div>
        </QuantityControl>

        {/* 송금 버튼 */}
        <Button onClick={handleTransfer}>
          송금하기
        </Button>
      </TrandeacionContainer>
    </>
  );
};

export default TransferClient;
