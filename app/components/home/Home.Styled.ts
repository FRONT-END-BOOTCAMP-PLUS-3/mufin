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
    padding: 0 1rem;
`;

export const ImageWrapper = styled.div`
    display: flex;
    flex: 1;
`;

export const IntroBox = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;

    padding: 1rem; 
    gap:1rem;

    background-color: var(--primary-50);
    border-radius: 10px;
    
    text-align: center;

    p {
        display: flex;
        font-size: var(--font-size-md);
        color: var(--black-color);
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

`;

export const InvestmentSection = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    
    align-items: center;
    
    width: 100%;
    
    padding: 0 1rem;
    gap: 1rem;
`;

export const InvestmentHeader = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
    

    width: 100%;
    gap: 0.75rem;
    padding-left: 0.75rem;

    h2 {
        font-size: var(--font-size-xl);
        font-weight: bold;
    }

    p {
        color: var(--gray-800);
        font-size: 0.875rem; /* 14px */
    }
`;

export const QuizErrorModal = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    text-align: center;
    background-color: var(--white-color);
    gap: 0.5rem;

    p{
        font-size: 1rem;
    }
`;

export const TitleBox = styled.div`
    width: 100%;
    
    padding: 0.75rem;

    font-size: var(--font-size-xl);
    font-weight: bold;
    text-align: left;

    border-bottom : 1px solid var(--disabled-color);
`;