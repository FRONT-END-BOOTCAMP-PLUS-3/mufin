"use client";
import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 1rem; /* 16px */
    gap: 1.25rem; /* 20px */
`;

export const TopSection = styled.section`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 25.5rem; /* 408px */
`;

export const ImageWrapper = styled.div`
    flex: 1;
`;

export const IntroBox = styled.div`
    flex: 1.2;
    text-align: center;
    border: 1px solid var(--gray-100);
    border-radius: 0.75rem; /* 12px */
    padding: 0.75rem; /* 12px */

    p {
        font-size: 0.875rem; /* 14px */
        color: var(--gray-800);
        margin-bottom: 0.75rem; /* 12px */
    }
`;

export const QuizButton = styled.button`
    display: flex;
    align-items: center;
    gap: 0.7rem;
    padding: 1.25rem 1.875rem; /* 20px 30px */
    background-color: var(--primary-color);
    color: white;
    text-decoration: none;
    border-radius: 1rem;
    font-size: var(--font-size-base);
    font-weight: bold;

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
