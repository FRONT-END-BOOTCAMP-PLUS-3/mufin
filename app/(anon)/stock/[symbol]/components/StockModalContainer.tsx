"use client";

import { StockErrorModal } from "@/app/(anon)/stock/[symbol]/components/StockDetail.Styled";
import Modal from "@/app/components/modal/Modal";

interface StockModalContainerProps {
  isOpen: boolean;
  onClose: () => void;
}

const StockModalContainer = ({ isOpen, onClose }: StockModalContainerProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <StockErrorModal>
        <h5>다시 방문해 주세요!</h5>
        <p>장 마감 및 휴장일로 서비스 이용이 어렵습니다.</p>
      </StockErrorModal>
    </Modal>
  );
};

export default StockModalContainer;