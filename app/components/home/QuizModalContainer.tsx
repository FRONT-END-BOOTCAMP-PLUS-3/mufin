"use client";

import { QuizErrorModal } from "@/app/components/home/Home.Styled";
import Modal from "@/app/components/modal/Modal";

import { ClockLoader } from "react-spinners";

interface QuizModalContainerProps {
  isOpen: boolean;
  onClose: () => void;
}

const QuizModalContainer = ({ isOpen, onClose }: QuizModalContainerProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <QuizErrorModal>
        <ClockLoader size={50}/>
        <h5>CLOSE</h5>
        <p>오늘의 퀴즈를 만료했습니다.</p>
      </QuizErrorModal>
    </Modal>
  );
};

export default QuizModalContainer;