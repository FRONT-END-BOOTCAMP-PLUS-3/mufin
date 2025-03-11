"use client"

import { IntroBox, QuizButton } from "@/app/components/home/Home.Styled";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

const HomeQuiz = () => {
    const router = useRouter();

    const handleQuizButtonClick = async () => {
        try {
          const response = await fetch("/api/user/quiz/result", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          });
    
          if(response.status === 401) {
            alert("로그인이 필요합니다.");
            return;
          }
    
          const result = await response.json();
    
          const isTodayAttempt: boolean = result.isTodayAttempt;
    
          if (isTodayAttempt) {
            alert("오늘의 퀴즈를 만료했습니다.");
          } else {
            router.push("user/quiz");
          }
        } catch (error) {
          alert("로그인이 필요한 기능입니다.");
          console.error("에러 발생:", error);
        }
      };

    return(
        <IntroBox>
          <p>금융 퀴즈를 풀고 포인트를 쌓아 실전처럼 투자해보세요!</p>
          <QuizButton onClick={handleQuizButtonClick}>
            오늘의 퀴즈 풀기
            <ArrowRight size={18} />
          </QuizButton>
        </IntroBox>
    )
}

export default HomeQuiz;