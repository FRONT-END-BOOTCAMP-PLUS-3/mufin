"use client";

import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import {
  QuantityControl,
  TransferContainer,
  WalletError,
  MainButton,
  TransferContent,
  TransferTitle1,
  TransferTitle2,
} from "@/app/user/transfer/components/TransferClient.Styled";

import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import '@/app/components/styles/swal-custom.css';

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
  
      Swal.fire({
        title: `${type === "toCash" ? "주식계좌로" : "기본계좌로"} 송금 성공!`,
        icon: "success",
        confirmButtonText: "확인",
        customClass: {
              title: 'swal-title-custom',
              popup: 'swal-popup-custom',
              confirmButton: 'swal-confirm-button',
              icon: 'swal-icon-custom'
            }
      });
  
      router.push("/user/asset"); 
    } catch (error) {
      if (error instanceof Error) {
        Swal.fire({
          title: `${type === "toCash" ? "주식계좌로" : "기본계좌로"} 송금 실패`,
          icon: "error",
          confirmButtonText: "확인",
          customClass: {
              title: 'swal-title-custom',
              popup: 'swal-popup-custom',
              confirmButton: 'swal-confirm-button',
              icon: 'swal-icon-custom'
            },
          width: '90%'
        });
        console.log(`${type === "toCash" ? "주식계좌로" : "기본계좌로"} 송금 실패: ${error.message}`);
      } else {
        Swal.fire({
          title: `${type === "toCash" ? "주식계좌로" : "기본계좌로"} 송금 실패`,
          icon: "error",
          confirmButtonText: "확인",
          customClass: {
              title: 'swal-title-custom',
              popup: 'swal-popup-custom',
              confirmButton: 'swal-confirm-button',
              icon: 'swal-icon-custom'
            },
          width: '90%'
        });
        console.log(`${type === "toCash" ? "주식계좌로" : "기본계좌로"} 송금 실패: 알 수 없는 오류`);
      }
    }
  };

  const isTransferDisabled =
    (type === "toCash" && (balances.account < (amount ?? 0))) || 
    (type === "toAccount" && (balances.cash < (amount ?? 0))); 

  return (
    <>
      <TransferContainer>
        <TransferTitle1>{type === 'toCash' ? '기본계좌에서' : '주식계좌에서'}</TransferTitle1>
        <TransferTitle2>{type === 'toCash' ? '주식계좌로' : '기본계좌로'} 송금</TransferTitle2>
          <TransferContent>
          <div className="row-container">
            <p className="label">금액</p>
            <input
              type="number"
              value={amount ?? ""}
              onChange={handleInputChange}
              placeholder="송금 금액 입력"
              ref={inputRef}
            />
            <span className="currency">원</span>
            </div>
            <p className="label2">
              송금 가능 금액 : {type === "toCash" ? balances.account : balances.cash}원
            </p>
            <div className="error-container">
              {isTransferDisabled && <WalletError>잔액이 부족합니다.</WalletError>}
            </div>
          </TransferContent>

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
        </TransferContainer>

        <MainButton
          as="button"
          onClick={handleTransfer}
          disabled={
            !amount ||
            amount <= 0 ||
            (type === "toCash" && balances.account < (amount ?? 0)) ||
            (type === "toAccount" && balances.cash < (amount ?? 0))
          }
        >
          송금하기
        </MainButton>
    </>
  );
};

export default TransferClient;
