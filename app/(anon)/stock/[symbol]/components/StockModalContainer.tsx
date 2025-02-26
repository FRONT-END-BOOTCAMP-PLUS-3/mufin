"use client";

import Modal from "@/app/components/Modal";
import { useState } from "react";

const StockModalContainer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2>오늘은 휴장일 입니다.</h2>
      </Modal>
    </div>
  );
};

export default StockModalContainer;