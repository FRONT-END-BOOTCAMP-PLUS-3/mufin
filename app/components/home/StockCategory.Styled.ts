import Link from "next/link";
import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 24.5rem;
`;

export const TitleBox = styled.div`
    display: inline-block;
    width: fit-content;
    padding: 0.25rem 0.875rem;
    background-color: var(--gray-200);
    border-radius: 5px;
    font-size: 1rem;
    font-weight: bold;
`;

export const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    margin-top: 1rem;
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
    margin-bottom: 5px; /* 위 간격 조정 */
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