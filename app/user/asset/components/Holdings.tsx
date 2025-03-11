"use client";

import styled from "styled-components";

interface Holding {
    logo: string;
    name: string;
    quantity: number;
    amount: number;
    profit?: number;
    profitRate?: number;
}

interface HoldingsProps {
    holdings: Holding[];
}

const Holdings = ({ holdings }: HoldingsProps) => {
    return (
        <Container>
            <Title>보유 종목</Title>
            <Table>
                <thead>
                    <TableRow>
                        <TableHeader>종목</TableHeader>
                        <TableHeader>수량</TableHeader>
                        <TableHeader>금액</TableHeader>
                    </TableRow>
                </thead>
                <tbody>
                    {holdings.map((stock, index) => (
                        <TableRow key={index}>
                            <TableCell>
                                <StockInfo>
                                    <StockLogo src={stock.logo} alt={stock.name} />
                                    {stock.name}
                                </StockInfo>
                            </TableCell>
                            <TableCell>{stock.quantity}주</TableCell>
                            <TableCell>
                                {stock.amount.toLocaleString()} 원
                                {stock.profit !== undefined && stock.profitRate !== undefined && (
                                    <ProfitText isPlus={stock.profit >= 0}>
                                        {stock.profit >= 0 ? "+" : ""}
                                        {stock.profit.toLocaleString()}원 ({stock.profitRate}%)
                                    </ProfitText>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default Holdings;

// Styled Components
const Container = styled.div`
    width: 100%;
    padding-top: 1.5rem;
`;

const Title = styled.h3`
    font-size: 1.375rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
`;

const TableHeader = styled.th`
    font-size: 1rem;
    font-weight: bold;
    padding: 0.75rem;
    text-align: left;
    border-bottom: 2px solid #ddd;
`;

const TableRow = styled.tr`
    text-align: left;
`;

const TableCell = styled.td`
    padding: 0.75rem;
`;

const StockInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

const StockLogo = styled.img`
    width: 1.5rem;
    height: 1.5rem;
`;

const ProfitText = styled.p<{ isPlus: boolean }>`
    font-size: 0.875rem;
    font-weight: bold;
    color: ${({ isPlus }) => (isPlus ? "red" : "blue")};
    margin-top: 0.25rem;
`;
