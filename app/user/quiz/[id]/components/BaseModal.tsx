"use client";
import BaseButton from "./BaseButton";
import * as S from "./BaseModal.Styled";

interface BaseModalProps {
  isLast: boolean;
  isCorrect: boolean;

  score: number;
  onNext: () => void; // ✅ onNext 함수 추가
}

const BaseModal = ({ isLast, isCorrect, score, onNext }: BaseModalProps) => {
  const resultText = isLast
    ? "축하합니다! \n 모든 문제를 푸셨습니다 🎉"
    : isCorrect
    ? "문제를 맞추셨어요 🎉"
    : "아쉽게도 틀렸습니다 😭";

    const getResultColor = () => {
        return isLast || isCorrect ? "var(--primary-color)" : "var(--second-color)";
      };
  const totalPrice = score * 10000;
  const formatNumber = totalPrice.toLocaleString("en-US");

  return (
    <>
      <S.BaseModalOverlay>
        <S.BaseModalContent>
          <S.ResultText $color={getResultColor()}>{resultText}</S.ResultText>
          <S.ResultPointText>
            획득한 학습 포인트 {formatNumber}
          </S.ResultPointText>
          <BaseButton $size="lg" onClick={onNext}>
            {isLast ? "홈으로 가기" : "다음 문제"}
          </BaseButton>
        </S.BaseModalContent>
      </S.BaseModalOverlay>
    </>
  );
};
export default BaseModal;
