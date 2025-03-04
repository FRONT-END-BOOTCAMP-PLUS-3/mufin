import styled from "styled-components";

export const TitleBox = styled.div`
    display: inline-block;
    padding: 3px 13px;
    background-color: var(--gray-200);
    border-radius: 5px;
    font-size: 1rem;
    font-weight: bold;
`;

export const Container = styled.div`
    width: 100%;
    max-width: 390px;
`;

export const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    margin-top: 15px;
`;

export const CategoryWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
`;

export const CategoryName = styled.span`
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 5px; /* 위 간격 조정 */
`;

export const CategoryCard = styled.div<{ color: string }>`
    width: 105px;
    height: 105px;
    background-color: ${({ color }) => color}; /* 각 카드의 배경색 */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 15px;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: filter 0.2s;

    &:hover {
        filter: brightness(90%);
    }
`;

export const ImageWrapper = styled.div``;
