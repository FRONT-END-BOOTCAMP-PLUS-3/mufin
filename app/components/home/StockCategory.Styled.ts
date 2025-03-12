import Link from "next/link";
import styled from "styled-components";

export const Container = styled.div`
    display: grid;
    flex-direction: column;
    width: 100%;
    margin-bottom: 10px;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    margin-top: 0.75rem;
`;

export const CategoryWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
`;

export const CategoryName = styled.span`
    font-size: var(--font-size-base);
    font-weight: bold;
    margin-top: 5px; /* 위 간격 조정 */
    cursor: default; 
`;

export const CategoryCard = styled(Link)<{ color: string }>`
    width: 6.5rem;
    height: 6.5rem;
    background-color: ${({ color }) => color}; /* 각 카드의 배경색 */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 1rem;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
    transition: filter 0.2s;

    &:hover {
        filter: brightness(90%);
    }
`;