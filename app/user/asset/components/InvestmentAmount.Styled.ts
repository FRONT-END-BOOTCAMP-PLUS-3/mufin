import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    padding-top: 1.5rem;
`;

export const Title = styled.h3`
    font-size: 1.375rem;
    font-weight: bold;
`;

export const Amount = styled.p`
    font-size: 1.375rem;
    font-weight: bold;
    margin-top: 0.5rem;
`;

export const ProfitContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 0.75rem;
`;

export const ProfitLabel = styled.p`
    font-size: 1rem;
`;

export const ProfitValue = styled.p<{ $isPositive: boolean }>`
    font-size: 1rem;
    font-weight: bold;
    color: ${({ $isPositive }) => ($isPositive ? "red" : "blue")};
`;

export const CashContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1rem;
    padding: 0.75rem;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
`;

export const CashLabel = styled.p`
    font-size: 1rem;
    font-weight: bold;
`;

export const CashAmount = styled.p`
    font-size: 1rem;
    font-weight: bold;
`;