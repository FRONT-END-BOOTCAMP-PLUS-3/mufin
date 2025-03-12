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
    flex: 0.6;
    text-align: center;
    background-color: var(--primary-50);
    border-radius: 10px;
    padding: 1rem; 

    p {
        font-size: 0.875rem; /* 14px */
        color: var(--black-color);
        margin-bottom: 1rem; /* 12px */
    }
`;

export const QuizButton = styled.button`
    display: flex;
    align-items: center;         /* 수직 중앙 정렬 */
    justify-content: center;
    gap: 0.7rem;
    padding: 1rem;
    background-color: var(--primary-color);
    color: var(--white-color);
    text-decoration: none;
    border-radius: 10px;
    border: none;
    font-size: var(--font-size-base);
    font-weight: bold;
    text-align: center;
    width: 100%;

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
    gap: 1rem; /* 16px */

    h2 {
        font-size: 1.5rem; /* 24px */
        font-weight: bold;
    }

    p {
        color: var(--gray-800);
        padding-top: 0.75rem; /* 12px */
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