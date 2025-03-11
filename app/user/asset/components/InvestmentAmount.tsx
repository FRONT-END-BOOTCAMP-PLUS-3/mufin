"use client";

import styled from "styled-components";

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
                <ProfitValue isPositive={totalProfit >= 0}>
                    {totalProfit >= 0 ? "+" : ""}
                    {totalProfit.toLocaleString()}원 ({totalProfitRate}%)
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

// Styled Components
const Container = styled.div`
    width: 100%;
    padding-top: 1.5rem;
`;

const Title = styled.h3`
    font-size: 1.375rem;
    font-weight: bold;
`;

const Amount = styled.p`
    font-size: 1.375rem;
    font-weight: bold;
    margin-top: 0.5rem;
`;

const ProfitContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 0.75rem;
`;

const ProfitLabel = styled.p`
    font-size: 1rem;
`;

const ProfitValue = styled.p<{ isPositive: boolean }>`
    font-size: 1rem;
    font-weight: bold;
    color: ${({ isPositive }) => (isPositive ? "red" : "blue")};
`;

const CashContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1rem;
    padding: 0.75rem;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
`;

const CashLabel = styled.p`
    font-size: 1rem;
    font-weight: bold;
`;

const CashAmount = styled.p`
    font-size: 1rem;
    font-weight: bold;
`;
