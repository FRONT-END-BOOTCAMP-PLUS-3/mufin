"use client";

import styled from "styled-components";

interface Holding {
    // API에서 받을 수 있는 필드 (두 가지 네이밍을 모두 지원)
    logo?: string;
    stockCode?: string;
    name?: string;
    stockName?: string;
    quantity?: number;
    stockQty?: number;
    amount?: number;
    marketValue?: number;
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
                    {holdings.map((item, index) => {
                        // API에서 전달받은 필드명이 다를 수 있으므로 기본값으로 변환
                        const logo =
                            item.logo ||
                            (item.stockCode ? `/images/${item.stockCode}.png` : "/images/default_stock.png");
                        const displayName = item.name || item.stockName || "알 수 없음";
                        const quantity =
                            item.quantity !== undefined
                                ? item.quantity
                                : item.stockQty !== undefined
                                ? item.stockQty
                                : 0;
                        const amount =
                            item.amount !== undefined
                                ? item.amount
                                : item.marketValue !== undefined
                                ? item.marketValue
                                : 0;

                        return (
                            <TableRow key={index}>
                                <TableCell>
                                    <StockInfo>
                                        <StockLogo src={logo} alt={displayName} />
                                        {displayName}
                                    </StockInfo>
                                </TableCell>
                                <TableCell>{quantity}주</TableCell>
                                <TableCell>
                                    {amount.toLocaleString()} 원
                                    {item.profit !== undefined && item.profitRate !== undefined && (
                                        <ProfitText isPlus={item.profit >= 0}>
                                            {item.profit >= 0 ? "+" : ""}
                                            {item.profit.toLocaleString()}원 ({item.profitRate}%)
                                        </ProfitText>
                                    )}
                                </TableCell>
                            </TableRow>
                        );
                    })}
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
