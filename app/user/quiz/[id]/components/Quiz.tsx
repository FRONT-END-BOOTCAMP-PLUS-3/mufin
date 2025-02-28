"use client";
import * as S from "@/app/user/quiz/[id]/components/Quiz.Styled";
import BaseButton from "@/app/user/quiz/[id]/components/BaseButton";

const Quiz = () => {
  return (
    <>
      <S.QuizContainer>
        <S.ProgressWrapper>

        </S.ProgressWrapper>
        <S.QuizText>
          코리아 디스카운트는 한국 기업의 주식이 저평가되는 현상을 말한다.
        </S.QuizText>
        
        <S.QuizButtonWrapper>
          <S.SelectButton>
          O
          </S.SelectButton>
          <S.SelectButton>
          X
          </S.SelectButton>
        </S.QuizButtonWrapper>

        <S.ResultButtonWrapper>
          <BaseButton $color="red">정답확인</BaseButton>
        </S.ResultButtonWrapper>

      </S.QuizContainer>
    </>
  );
};
export default Quiz;
