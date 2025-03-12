"use client";
import { useEffect } from "react";
import styled from "styled-components";

interface Holding {
    // API에서 받을 수 있는 필드 (두 가지 네이밍을 모두 지원)
    stockImage?: string;
    //stockCode?: string;
    stockName?: string;
    stockQty?: number;
    profit?: number;
    profitRate?: number;
    totalValue?: number;
    currentPrice?: number;
}

interface HoldingsProps {
    holdings: Holding[];
}

const Holdings = ({ holdings }: HoldingsProps) => {
    useEffect(() => {
        console.log("Holdings Data:", holdings);
        holdings.forEach((item, index) => {
            console.log(`Holding ${index + 1}:`, item);
            console.log("totalValue:", item.totalValue);
            console.log("currPrice:", item.currentPrice);
            console.log("profit:", item.profit);
            console.log("profitRate:", item.profitRate);
        });
    }, [holdings]);
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
                        const displayName = item.stockName || "알 수 없음";
                        const quantity = item.stockQty || 0;
                        const total = quantity * item.currentPrice;

                        const stockImageSrc = item.stockImage ? `/stock/${item.stockImage}.png` : `/stock/DEFAULT.png`;

                        return (
                            <TableRow key={index}>
                                <TableCell>
                                    <StockInfo>
                                        <StockImage src={stockImageSrc} alt={displayName} width={40} height={40} />
                                        {item.stockName}
                                    </StockInfo>
                                </TableCell>
                                <TableCell>{quantity}주</TableCell>
                                <TableCell>
                                    {total} 원
                                    {/* {item.profit !== undefined && item.profitRate !== undefined && (
                                        <ProfitText isPlus={item.profit >= 0}>
                                            {item.profit >= 0 ? "+" : ""}
                                            {item.profit.toLocaleString()}원 ({item.profitRate}%)
                                        </ProfitText>
                                    )} */}
                                    <ProfitText $isPlus={item.profit >= 0}>
                                        {item.profit >= 0 ? "+" : ""}
                                        {item.profit}원 ({item.profitRate}%)
                                    </ProfitText>
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

const StockImage = styled.img`
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
`;

const ProfitText = styled.p<{ isPlus: boolean }>`
    font-size: 0.7rem;
    font-weight: bold;
    color: ${({ $isPlus }) => ($isPlus ? "red" : "blue")};
`;
