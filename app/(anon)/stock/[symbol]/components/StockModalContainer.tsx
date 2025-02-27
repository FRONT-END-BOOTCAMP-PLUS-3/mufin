"use client";

import Modal from "@/app/components/modal/Modal";

interface StockModalContainerProps {
  isOpen: boolean;
  onClose: () => void;
}

const StockModalContainer = ({ isOpen, onClose }: StockModalContainerProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h5>오늘은 휴장일입니다.</h5>
    </Modal>
  );
};

export default StockModalContainer;