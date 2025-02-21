"use client";

import { useState } from "react";
import Modal from "@/app/components/modal";

const ModalContainer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      <button onClick={openModal}>모달 열기</button>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2>모달 내용</h2>
        <p>모달을 닫으려면 X 버튼을 클릭하세요.</p>
      </Modal>
    </div>
  );
};

export default ModalContainer;
