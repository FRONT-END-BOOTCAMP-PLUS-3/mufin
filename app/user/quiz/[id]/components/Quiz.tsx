"use client";
import {QuizButtonWrapper, QuizContainer, TextGroup} from "@/app/user/quiz/[id]/components/Quiz.Styled";
import BaseButton from "@/app/user/quiz/[id]/components/BaseButton";

import ProgressBar from "@/app/user/quiz/[id]/components/ProgressBar";
import OXButtons from "@/app/user/quiz/[id]/components/OXButtons";
import OptionButtons from "@/app/user/quiz/[id]/components/OptionButtons";
import { useState } from "react";
import { mockQuizData, QuizData } from "@/app/user/quiz/[id]/components/mockData";
import BaseModal from "@/app/user/quiz/[id]/components/BaseModal";
import { useRouter } from "next/navigation";

// 문제 5개를 가져와서 한페이지 안에서 출력
const Quiz = () => {
  // quiz mockData
  const [quizData] = useState<QuizData[]>(mockQuizData);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [isLast, setIsLast] = useState<boolean>(false);
  const router = useRouter();

  const currentQuestion: QuizData = quizData[currentIndex];
  const totalQuestions: number = quizData.length;
  const isDisabled: boolean = selectedOption === 0;

  // 정답 확인 함수
  const handleResult = () => {
    setIsModalOpen(true);
    // 모달 오픈
    // 정답 확인해서 모달에 전달
    const correct = selectedOption === currentQuestion.answer;
    setIsCorrect(correct);
    if (correct) {
        // 사용자가 푼 문제가 정답이면 server에 퀴즈 id를 전달
        setScore((prev) => prev + 1);

    }
  };

  const handleNext = () => {
    setIsModalOpen(false);
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(0);
    } else if (currentIndex === totalQuestions - 1){
      setIsLast(true);
    } else {
      handleOut();
    }
  }

  const handleOut = () => {
    setIsModalOpen(false);
    setIsLast(false);
    router.push("/");
  };

  const renderChoices = () => {
    return currentQuestion.choices.length === 2 ? (
      <OXButtons choices={currentQuestion.choices} setSelectedOption={setSelectedOption} selectedOption={selectedOption} />
    ) : (
      <OptionButtons choices={currentQuestion.choices} setSelectedOption={setSelectedOption} selectedOption={selectedOption} />
    );
  };



  return (
    <>
      <QuizContainer>

        <TextGroup>
          <h2 className="quiz__current">
            {currentIndex + 1}/{totalQuestions}
          </h2>
          <ProgressBar current={currentIndex + 1} />
          <h3 className="quiz__question">{currentQuestion.questionText}</h3>
        </TextGroup>

        <QuizButtonWrapper $direction={currentQuestion.choices.length === 2 ? "row" : "column"} >
          {renderChoices()}
        </QuizButtonWrapper>

        <BaseButton
          $color="var(--primary-color)"
          onClick={handleResult}
          disabled={isDisabled}
        >
          정답확인
        </BaseButton>

      </QuizContainer>

    {/* ✅ 개별 정답 모달 또는 최종 결과 모달 */}
    {(isModalOpen || isLast) && (
        <BaseModal 
          isLast={isLast} 
          score={score} 
          isCorrect={isCorrect}  
          onNext={handleNext} // ✅ 최종 결과 모달이면 handleOut 실행
        />
      )}
    </>
  );
};
export default Quiz;
