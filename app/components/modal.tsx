import { ReactNode } from "react";
import { Overlay, Content, CloseButton } from "@/app/components/modal.styled"; // 스타일 파일
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean; // 모달이 열려있는지 여부
  onClose: () => void; // 모달을 닫는 함수
  children: ReactNode; // 모달 내용
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null; // 모달이 열리지 않으면 렌더링하지 않음

  return (
    <Overlay>
      <Content>
        {children}
        <CloseButton onClick={onClose}><X size={24} /></CloseButton>
      </Content>
    </Overlay>
  );
};

export default Modal;
