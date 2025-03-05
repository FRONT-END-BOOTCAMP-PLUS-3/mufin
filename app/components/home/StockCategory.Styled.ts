import styled from "styled-components";

export const TitleBox = styled.div`
    display: inline-block;
    padding: 0.25rem 0.875rem; /* 4px 14px */
    background-color: var(--gray-200);
    border-radius: 0.375rem; /* 6px */
    font-size: 1rem; /* 유지 */
    font-weight: bold;
`;

export const Container = styled.div`
    width: 100%;
    max-width: 24.5rem; /* 392px */
`;

export const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem; /* 16px */
    margin-top: 1rem; /* 16px */
`;

export const CategoryWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
`;

export const CategoryName = styled.span`
    font-size: 0.875rem; /* 14px */
    font-weight: bold;
    margin-bottom: 0.375rem; /* 6px */
`;

export const CategoryCard = styled.div<{ color: string }>`
    width: 6.5rem; /* 104px */
    height: 6.5rem; /* 104px */
    background-color: ${({ color }) => color}; /* 각 카드의 배경색 */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 1rem; /* 16px */
    box-shadow: 0.125rem 0.125rem 0.625rem rgba(0, 0, 0, 0.1); /* 2px 2px 10px */
    cursor: pointer;
    transition: filter 0.2s;

    &:hover {
        filter: brightness(90%);
    }
`;
