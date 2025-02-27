"use client";
import * as S from "@/app/user/quiz/[id]/components/Quiz.Styled";

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

          </S.SelectButton>
          <S.SelectButton>

          </S.SelectButton>
        </S.QuizButtonWrapper>

        <S.ResultButtonWrapper>
          결과 보기
        </S.ResultButtonWrapper>

      </S.QuizContainer>
    </>
  );
};
export default Quiz;
