"use client";
import {
  ButtonWrapper,
  ResultContainer,
  ResultTopWrapper,
} from "@/app/user/quiz/result/components/QuizResult.Styled";
import Image from "next/image";
import { BaseButton } from "@/app/user/quiz/components";
import { useCountUp } from "./useCountUp";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import Fireworks from "@/app/user/quiz/result/components/Firwork";
const QuizResult = () => {
  const searchParams = useSearchParams();
  const totalPrice = searchParams.get("t") || 0;
  const count = useCountUp(Number(totalPrice));
  const formatNumber = count.toLocaleString("en-US");
  const router = useRouter();

  useEffect(() => {
    const fetchSaveResult = async () => {
      try {
        await fetch("/api/user/quiz/result", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
      } catch (error) {
        console.error("하루 퀴즈 결과 저장 오류", error);
      }
    };
    fetchSaveResult();
  }, []);
  return (
    <>
    <Fireworks />
      <ResultContainer>
        <ResultTopWrapper>
          <Image
            src="/mufin1.svg"
            alt="Logo"
            width={70}
            height={60}
          />
          <h2 className="result__status">
            오늘의 학습을 <br /> 완료 했습니다🎉
          </h2>

          <p className="result__description">총 획득한 학습 포인트</p>
          <p className="result__totalPrice">{formatNumber}</p>
        </ResultTopWrapper>
        <ButtonWrapper>
          <BaseButton onClick={() => router.push("/")}>
            모의투자로 이동하기
          </BaseButton>
          <BaseButton onClick={() => router.push("/user/asset")}>
            나의 자산 이동
          </BaseButton>
        </ButtonWrapper>
      </ResultContainer>
    </>
  );
};
export default QuizResult;
