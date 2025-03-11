import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    padding-top: 1.5rem;
`;

export const Title = styled.h3`
    font-size: var(--font-size-2xl);
    font-weight: bold;
    margin-bottom: 0.5rem;
`;

export const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
`;

export const TableHeader = styled.th`
    font-size: var(--font-size-lg);
    font-weight: bold;
    padding: 0.75rem;
    text-align: left;
    border-bottom: 1px solid var(--disabled-color);
`;

export const TableRow = styled.tr`
    text-align: left;
`;

export const TableCell = styled.td`
    padding: 0.75rem;
`;

export const StockInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

export const StockLogo = styled.img`
    width: 1.5rem;
    height: 1.5rem;
`;

export const ProfitText = styled.p<{ $isPlus: boolean }>`
    font-size: var(--font-size-base);
    font-weight: bold;
    color: ${({ $isPlus }) => ( $isPlus ? "red" : "blue" )};
    margin-top: 0.25rem;
`;