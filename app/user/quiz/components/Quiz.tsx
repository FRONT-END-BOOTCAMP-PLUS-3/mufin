"use client";
import { useState } from "react";
import {
  ProgressBar,
  OXButtons,
  OptionButtons,
  BaseModal,
  BaseButton,
} from "@/app/user/quiz/components";
import {
  QuizButtonWrapper,
  QuizContainer,
  TextGroup,
} from "@/app/user/quiz/components/Quiz.Styled";
import { useRouter } from "next/navigation";

interface QuizProps {
  quiz: {
    totalQuestions: number;
    questions: QuizData[];
  };
}
export interface QuizData {
  index: number;
  questionId: number;
  questionText: string;
  answer: number;
  choices: { choiceId: number; choiceText: string; choiceNumber: number }[];
}

// 문제 5개를 가져와서 한페이지 안에서 출력
const Quiz = ({ quiz }: QuizProps) => {
  // quiz mockData
  const [quizData] = useState<QuizData[]>(quiz.questions);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [isLast, setIsLast] = useState<boolean>(false);
  const router = useRouter();

  const currentQuestion: QuizData = quizData[currentIndex];
  const totalQuestions: number = quiz.totalQuestions;
  const isDisabled: boolean = selectedOption === 0;

  // 정답 확인 함수
  const handleResult = async () => {
 
    
    // 정답 확인해서 모달에 전달
    const correct = selectedOption === currentQuestion.answer;
    setIsCorrect(correct);
   // 모달 open
    setIsModalOpen(true);

    if (correct) {
      setTotalPrice((prev) => prev + 50000);
      // 사용자가 푼 문제가 정답이면 server에 퀴즈 id를 전달
      try {
        await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/quiz`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            questionId: currentQuestion.questionId,
            reword: 50000,
          }),
        });
     
      } catch (error) {
        console.error("데이터 전송 실패", error);
      }
    }
  };

  // 다음 문제 넘어가기
  const handleNext = () => {
    setIsModalOpen(false);
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(0);
    } else {
      setIsLast(true);
      router.push(`/user/quiz/result?t=${totalPrice}`)
    } 
  };

  // 조건부 렌더링
  const renderChoices = () => {
    return currentQuestion.choices.length === 2 ? (
      <OXButtons
        choices={currentQuestion.choices}
        setSelectedOption={setSelectedOption}
        selectedOption={selectedOption}
      />
    ) : (
      <OptionButtons
        choices={currentQuestion.choices}
        setSelectedOption={setSelectedOption}
        selectedOption={selectedOption}
      />
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

        <QuizButtonWrapper
          $direction={currentQuestion.choices.length === 2 ? "row" : "column"}
        >
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
      {isModalOpen && (
        <BaseModal
          isLast={isLast}
          totalPrice={totalPrice}
          isCorrect={isCorrect}
          onNext={handleNext} // ✅ 최종 결과 모달이면 handleOut 실행
        />
      )}
    </>
  );
};
export default Quiz;
