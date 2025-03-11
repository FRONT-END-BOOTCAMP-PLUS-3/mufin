"use client"
import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";

export const StockWrapper = styled.section`
    width: 100%;
    margin-bottom: 1rem;
    padding: 0 0.625rem;
`;

export const TitleBox = styled.div`
    display: inline-flex;
    justify-content: center;
    align-items:center;

    padding: 0.25rem 0.875rem; 

    background-color: var(--gray-200);
    border-radius: 6px;

    font-size: 1rem;
    font-weight: bold;
`;

export const StockItemBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 100%;

    margin-top: 0.375rem;
`;

export const StockLink = styled(Link)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    width: 100%;

    padding: 0.5rem;

    border-bottom: 1px solid #ddd;
    
    color: inherit;

    cursor: pointer;

    &:hover {
        background-color: #f7f7f7;
    }
`;

export const StockInfo = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`;

export const StockLeft = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
`;

export const LogoWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    width: 2.5rem;
    height: 2.5rem;

    border-radius: 50%;
    overflow: hidden;
`;

export const StockImage = styled(Image)`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;


export const StockName = styled.div`
    font-size: 1rem;
    color: var(--gray-800);
    font-weight: 500;
`;



export const StockRight = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
`;

export const StockPrice = styled.p`
    font-size: var(--font-size-xl);
    font-weight: bold;
`;

export const StockChange = styled.p<{ $isPositive: boolean }>`
    font-size: 1rem;
    color: ${(props) => (props.$isPositive ?   "var(--second-color)" : "var(--primary-color)")};
`;