"use client";
import BaseButton from "./BaseButton";
import * as S from "./BaseModal.Styled";

interface BaseModalProps {
  answer: string;
  isLast: boolean;
  isCorrect: boolean;

  totalPrice: number;
  onNext: () => void; // ✅ onNext 함수 추가
}

const BaseModal: React.FC<BaseModalProps> = ({
  answer,
  isCorrect,
  totalPrice,
  onNext,
}: BaseModalProps) => {
  const getResultColor = () => {
    return isCorrect ? "var(--primary-color)" : "var(--second-color)";
  };
  const formatNumber = totalPrice.toLocaleString("en-US");

  return (
    <>
      <S.BaseModalOverlay>
        <S.BaseModalContent>
          <S.ResultText $color={getResultColor()}>
            {isCorrect ? (
              <>
                축하합니다!
                <br /> 문제를 맞추셨어요 🎉
              </>
            ) : (
              <>
                아쉽게도 틀렸습니다 😭
                <br />
                <span className="modal__answer-description">
                  정답은: &nbsp; 
                <span className= "modal__answer">
                  {answer}</span> 입니다.
                </span>
              </>
            )}
          </S.ResultText>
          <S.ResultPointText>
            획득한 학습 포인트 {formatNumber}
          </S.ResultPointText>
          <BaseButton $size="lg" onClick={onNext}>다음문제 가기
          </BaseButton>
        </S.BaseModalContent>
      </S.BaseModalOverlay>
    </>
  );
};
export default BaseModal;
