"use client";

import {
    Container,
    Title,
    Amount,
    ProfitContainer,
    ProfitLabel,
    ProfitValue,
    CashContainer,
    CashLabel,
    CashAmount,
} from "@/app/user/asset/components/InvestmentAmount.Styled";

interface InvestmentAmountProps {
    investmentAmount: number;
    totalProfit: number;
    totalProfitRate: number;
    cash: number;
}

const InvestmentAmount = ({ investmentAmount, totalProfit, totalProfitRate, cash }: InvestmentAmountProps) => {
    return (
        <Container>
            {/* 투자 금액 */}
            <Title>투자 금액</Title>
            <Amount>{investmentAmount.toLocaleString()} 원</Amount>

            {/* 총 평가손익 */}
            <ProfitContainer>
                <ProfitLabel>총 평가손익(원)</ProfitLabel>
                <ProfitValue $isPositive={totalProfit >= 0}>
                    {totalProfit >= 0 ? "+" : ""}
                    {totalProfit.toLocaleString()}원 ({totalProfitRate.toFixed(2)}%)
                </ProfitValue>
            </ProfitContainer>

            {/* 예수금 */}
            <CashContainer>
                <CashLabel>예수금</CashLabel>
                <CashAmount>{cash.toLocaleString()} 원</CashAmount>
            </CashContainer>
        </Container>
    );
};

export default InvestmentAmount;
