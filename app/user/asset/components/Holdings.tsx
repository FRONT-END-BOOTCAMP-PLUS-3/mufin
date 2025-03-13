"use client";
import { ArrowRight } from "lucide-react";
import {
    Container,
    Title,
    Table,
    TableHeader,
    TableRow,
    TableCell,
    StockInfo,
    StockImage,
    ProfitText,
    HistoryButton,
} from "@/app/user/asset/components/Holdings.Styled";

interface Holding {
    stockImage?: string;
    stockName?: string;
    stockQty?: number;
    profit?: number;
    profitRate?: number;
    currentPrice?: number;
    total?: number;
}

interface HoldingsProps {
    holdings: Holding[];
}

const Holdings = ({ holdings }: HoldingsProps) => {
    return (
        <Container>
            <Title>보유 종목</Title>
            <HistoryButton href="/user/stockhistory">
                거래내역 확인하러 가기 <ArrowRight size={15} />
            </HistoryButton>
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
                        const displayName = item.stockName || "알 수 없음";
                        const quantity = item.stockQty ?? 0;
                        const currentPrice = item.currentPrice ?? 0;
                        const total = quantity * currentPrice;
                        const original = item.total ?? 0;
                        const currVal = currentPrice * quantity;
                        const profit = currVal - original;
                        const profitRate = original > 0 ? (profit / original) * 100 : 0;
                        const stockImageSrc = item.stockImage ? `/stock/${item.stockImage}.png` : `/stock/DEFAULT.png`;

                        return (
                            <TableRow key={index}>
                                <TableCell>
                                    <StockInfo>
                                        <StockImage src={stockImageSrc} alt={displayName} width={40} height={40} />
                                        {displayName}
                                    </StockInfo>
                                </TableCell>
                                <TableCell>{quantity}주</TableCell>
                                <TableCell>
                                    {total.toLocaleString()} 원
                                    <ProfitText $isPositive={profit >= 0}>
                                        {profit >= 0 ? "+" : ""}
                                        {profit.toLocaleString()}원 ({profitRate.toFixed(2)}%)
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
