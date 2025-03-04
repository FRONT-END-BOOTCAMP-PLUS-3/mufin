"use client";
import React from "react";
import styled from "styled-components";

type ButtonProps = {
  onClick?: () => void;
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
};

const StyledButton = styled.button`
  background-color: var(--primary-color);
  width: 341px;
  height: 48px;
  border: none;
  border-radius: 10px;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: var(--primary-400);
  }
`;

const Button = ({ onClick, children, type = "button" }: ButtonProps) => {
  return (
    <StyledButton onClick={onClick} type={type}>
      {children}
    </StyledButton>
  );
};

export default Button;
