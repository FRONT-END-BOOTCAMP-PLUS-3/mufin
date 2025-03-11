import styled, { keyframes } from "styled-components";
interface ITest {
  $width: number;
}


const slideIn = (width: number) =>keyframes`
  from {
    width: 0%;
  }
  to {
    width: ${width}%;
  }
`;

export const ProgressBarContainer = styled.div`
  display: flex;

  width: 100%;
  height: 20px;

  background-color: var(--background-color);
  opacity: 0.8;

  border-radius: 16px;
  overflow: hidden;
`;

export const Progress = styled.div<ITest>`
  display: block;

  width: ${(props) => props.$width}%; /* ✅ Props를 통해 width 동적 설정 */
  height: 100%;

  padding: 0;

  background-color: var(--primary-color);

  border-radius: 16px;

  animation: ${({ $width }) => slideIn($width)} 3s ease-in-out;;
  z-index: 100;
`;
