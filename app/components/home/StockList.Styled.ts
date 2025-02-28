import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";

export const StockContainer = styled.div`
    width: 100%;
    max-width: 390px;
`;

export const TitleBox = styled.div`
    display: inline-block;
    padding: 3px 13px;
    background-color: var(--gray-200);
    border-radius: 5px;
    font-size: 1rem;
    font-weight: bold;
`;

export const StockItems = styled.div`
    margin-top: 5px;
`;

export const StockLink = styled(Link)`
    text-decoration: none;
    color: inherit;
`;

export const StockItem = styled.div`
    padding: 5px;
    border-bottom: 1px solid #ddd;
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
    gap: 10px;
`;

export const LogoWrapper = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
    align-items: center;
    justify-content: center;
`;

export const StockName = styled.div`
    font-size: 1rem;
    color: #4a4a4a;
    font-weight: 500;
`;

export const StockRight = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
`;

export const StockPrice = styled.div`
    font-size: 1.1rem;
    font-weight: bold;
`;

export const StockChange = styled.div<{ $isPositive: boolean }>`
    font-size: 0.9rem;
    color: ${(props) => (props.$isPositive ? "red" : "blue")};
`;

export const StockImage = styled(Image)`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;
