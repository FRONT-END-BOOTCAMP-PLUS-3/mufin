"use client"

import { IntroBox, QuizButton } from "@/app/components/home/Home.Styled";
import QuizModalContainer from "@/app/components/home/QuizModalContainer";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";
import '@/app/components/styles/swal-custom.css';

const HomeQuiz = () => {
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleQuizButtonClick = async () => {
        try {
          const response = await fetch("/api/user/quiz/result", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          });
    
          if(response.status === 401) {
            Swal.fire({
              title: "로그인이 필요합니다.",
              icon: "info",
              confirmButtonText: "확인",
              customClass: {
                title: 'swal-title-custom',
                popup: 'swal-popup-custom',
                confirmButton: 'swal-confirm-button',
                icon: 'swal-icon-custom'
              }
            });
            return;
          }
    
          const result = await response.json();
    
          const isTodayAttempt: boolean = result.isTodayAttempt;
    
          if (isTodayAttempt) {
            setIsModalOpen(true);
          } else {
            router.push("user/quiz");
          }
        } catch (error) {
          Swal.fire({
            title: "로그인이 필요합니다.",
            icon: "info",
            confirmButtonText: "확인",
            customClass: {
              title: 'swal-title-custom',
              popup: 'swal-popup-custom',
              confirmButton: 'swal-confirm-button',
              icon: 'swal-icon-custom'
            }
          });
          console.error("에러 발생:", error);
        }
      };

    return(
        <IntroBox>
          <QuizModalContainer isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
          <p>금융 퀴즈를 풀고 포인트를 쌓아 <br /> 실전처럼 투자해보세요!</p>
          <QuizButton onClick={handleQuizButtonClick}>
            오늘의 퀴즈 풀기
            <ArrowRight size={18} />
          </QuizButton>
        </IntroBox>
    )
}

export default HomeQuiz;