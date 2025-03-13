import styled from "styled-components";
import Link from "next/link";

export const Container = styled.div`
    width: 100%;
    padding-top: 1.5rem;
`;

export const Title = styled.h3`
    font-size: 1.3rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
`;
export const HistoryButton = styled(Link)`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--primary-500);
    width: 11rem;
    padding: 0.2rem;
    font-size: 0.8rem;
    //border: 1px solid;
    border-radius: 5px;
    color: white;
    margin-left: auto; /* 추가: 우측 정렬 */

    cursor: pointer;

    &:hover {
        background-color: var(--primary-600);
    }
`;
export const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
`;

export const TableHeader = styled.th`
    font-size: 0.9rem;
    font-weight: bold;
    padding: 0.75rem;
    text-align: left;
    border-bottom: 2px solid var(--gray-100);
    &:nth-child(3) {
        text-align: right;
    }
`;

export const TableRow = styled.tr`
    text-align: left;
    font-size: 0.95rem;
`;

export const TableCell = styled.td`
    padding: 0.75rem;
    text-align: right;
`;

export const StockInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

export const StockImage = styled.img`
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
`;

export const ProfitText = styled.p<{ $isPositive: boolean }>`
    font-size: 0.7rem;
    font-weight: bold;
    color: ${({ $isPositive }) => ($isPositive ? "red" : "blue")};
`;
