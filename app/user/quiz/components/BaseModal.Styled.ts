import styled, { keyframes } from "styled-components";

const slideUp = keyframes`
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

export const BaseModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;

  display: flex;
  justify-content: center;
  align-items: flex-end;
  

  width: 100%;
  height: 100%;

  background: rgba(0, 0, 0, 0.5);
  
  z-index: 1000;
`;

export const BaseModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  max-width: var(--background-width);
  height: 30%;

  padding: 2.5rem;

  background: white;

  text-align: center;
  border-radius: 10px 10px 0 0;
  animation: ${slideUp} 0.3s ease-out;
`;

export const ResultText = styled.h5<{ $color: string }>`
  width: 100%;

  color: ${(props) => props.$color};
  
  word-wrap: break-word;
  white-space: pre-wrap;
  
`;

export const ResultPointText = styled.p`
  font-size: var(--font-size-lg);
  font-weight: bold;
`;
