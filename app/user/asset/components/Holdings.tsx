"use client";

import { Container, ProfitText, StockInfo, StockLogo, Table, TableCell, TableHeader, TableRow, Title } from "@/app/user/asset/components/Holdings.Styled";

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
                                    <ProfitText $isPlus={stock.profit >= 0}>
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
