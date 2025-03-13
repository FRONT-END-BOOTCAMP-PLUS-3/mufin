"use client";
import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 1rem; 
    gap: 1.25rem; 
`;

export const TopSection = styled.section`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 25.5rem;
`;

export const ImageWrapper = styled.div`
    flex: 0.4;
`;

export const IntroBox = styled.div`
    display: flex;
    flex-direction: column;
    flex: 0.58;
    text-align: center;
    background-color: var(--primary-50);
    border-radius: 10px;
    padding: 1rem; 
    align-items: center;

    p {
        display: flex;
        font-size: var(--font-size-md);
        color: var(--black-color);
        margin-bottom: 1rem; /* 12px */
        word-break: break-word;
        white-space: pre-wrap;
    }
`;

export const QuizButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    
    width: 100%;

    padding: 1rem 1rem;
    gap: 0.625rem;

    background-color: var(--primary-color);
    color: var(--white-color);
    border-radius: 10px;
    border: none;

    font-size: var(--font-size-base);
    font-weight: bold;
    text-align: center;

    &:hover {
        background-color: var(--primary-700);
    }
    &:disabled{
        background-color: var(--disabled-color);
    }
`;

export const InvestmentSection = styled.section`
    flex-direction: column;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    max-width: 25.5rem; /* 408px */
    gap: 1rem; /* 16px */
`;

export const InvestmentHeader = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    max-width: 25.5rem; /* 408px */
    gap: 0.75rem; /* 16px */
    margin-left: 0.75rem;

    h2 {
        font-size: var(--font-size-2xl);
        font-weight: bold;
    }

    p {
        color: var(--gray-800);
        padding-top: 0.5rem; /* 12px */
        font-size: 0.875rem; /* 14px */
    }
`;

export const QuizErrorModal = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--white-color);
  border: none;
  gap: 0.5rem;

  p{
    font-size: 1rem;
  }
`;

export const TitleBox = styled.div`
    text-align: left;
    width: 100%;
    border-bottom : 1px solid var(--disabled-color);
    padding: 0.75rem;
    font-size: var(--font-size-xl);
    font-weight: bold;
`;