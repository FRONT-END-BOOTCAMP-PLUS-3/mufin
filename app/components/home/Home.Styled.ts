"use client";
import styled from "styled-components";
import Link from "next/link";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 15px 0 90px 0;
    gap: 20px;
`;

export const TopSection = styled.section`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 410px;
`;

export const ImageWrapper = styled.div`
    flex: 1;
`;

export const IntroBox = styled.div`
    flex: 1.2;
    text-align: center;
    border: 1px solid var(--gray-100);
    border-radius: 10px;
    padding: 10px;

    p {
        font-size: 0.9rem;
        color: var(--gray-800);
        margin-bottom: 10px;
    }
`;

export const QuizButton = styled(Link)`
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 20px 30px;
    background-color: var(--primary-color);
    color: white;
    text-decoration: none;
    border-radius: 14px;
    font-size: 1rem;
    font-weight: bold;
    transition: background 0.3s;

    &:hover {
        background-color: var(--primary-700);
    }
`;

export const InvestmentSection = styled.section`
    flex-direction: column;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    max-width: 410px;
    gap: 15px;
`;

export const InvestmentHeader = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    max-width: 410px;
    gap: 15px;
    h2 {
        font-size: 1.5rem;
        font-weight: bold;
    }
    p {
        color: var(--gray-800);
        padding-top: 10px;
        font-size: 0.8rem;
    }
`;
