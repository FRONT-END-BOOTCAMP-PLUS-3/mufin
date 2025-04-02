import { ButtonHTMLAttributes, CSSProperties } from "react";
import styled from "styled-components";

type ButtonSize = "sm" | "md" | "lg";

export interface StyledBaseButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** 버튼의 스타일 종류(filled, outlined, text) */
  /** 버튼의 크기(sm, md, lg) */
  $size?: ButtonSize;
  /** 버튼의 메인 색상 (필요할 경우) */
  $color?: string;
  /** 추가로 입힐 수 있는 인라인 스타일 */
  customStyle?: CSSProperties;
}

export const StyledButton = styled.button<StyledBaseButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
  height: 50px;
  border: none;
  border-radius: 10px;
  color: var(--white-color);
  background-color: ${({ $color }) => $color || "var(--primary-color)"};
  padding: 1rem;

  ${({ $size }) => {
    switch ($size) {
      case "sm":
        return "width: 50%;";
      case "md":
        return "width: 80%;";
      case "lg":
        return "width: 100%;";
      default:
        return "width: 100%;";
    }
  }}/* disabled 상태일 때 */
`;
