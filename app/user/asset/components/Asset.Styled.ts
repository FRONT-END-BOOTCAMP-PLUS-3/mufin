import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 30rem; /* 480px -> 30rem */
    margin: 0 auto;
    padding: 1.25rem; /* 20px -> 1.25rem */
`;

export const InvestmentGoal = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
`;

export const GoalText = styled.span`
    font-size: 1.1rem; /* 18px -> 1.125rem */
    font-weight: bold;
`;

export const RightContainer2 = styled.div`
    display: flex;
    align-items: center;
    gap: 0.625rem; /* 10px -> 0.625rem */
`;

export const GoalAmount = styled.span`
    font-size: 1.1rem; /* 18px -> 1.125rem */
    font-weight: bold;
    padding-bottom: 0.375rem; /* 6px -> 0.375rem */
`;

export const ProgressBarContainer = styled.div`
    width: 100%;
    height: 1.75rem; /* 28px -> 1.75rem */
    background: #f0f0f0;
    border-radius: 0.75rem; /* 12px -> 0.75rem */
    margin: 0.625rem 0; /* 10px -> 0.625rem */
    position: relative;
    overflow: hidden;
`;

export const Progress = styled.div<{ $progress: number }>`
    width: ${({ $progress }) => $progress}%;
    height: 100%;
    background: #ff6b6b;
    border-radius: 0.75rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75rem; /* 12px -> 0.75rem */
    font-weight: bold;
    color: white;
`;

export const TotalAssetsSection = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 1.25rem 0; /* 20px -> 1.25rem */
    border-bottom: 1px solid #ddd;
`;

export const TotalText = styled.span`
    font-size: 1.3rem; /* 22px -> 1.375rem */
    font-weight: bold;
`;

export const TotalValue = styled.span`
    font-size: 1.3rem;
    font-weight: bold;
`;

export const AccountSection = styled.div`
    width: 100%;
    background: #eef1ff;
    padding: 1rem; /* 16px -> 1rem */
    border-radius: 0.75rem; /* 12px -> 0.75rem */
    margin-top: 1rem;
    display: flex;
    justify-content: space-between;
`;

export const LeftContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

export const RightContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
`;

export const AccountTitle = styled.span`
    font-size: 1.1rem; /* 18px -> 1.125rem */
    font-weight: bold;
`;

export const AccountValue = styled.span`
    font-size: 1.2rem; /* 20px -> 1.25rem */
    font-weight: bold;
`;

export const TransferButton = styled.button`
    margin-top: 0.75rem;
    padding: 0.5rem 0.75rem;
    background: var(--primary-color);
    color: white;
    font-size: 0.875rem;
    font-weight: bold;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    &:hover {
        background: var(--primary-600);
    }
`;

// export const ProfitText = styled.p`
//     color: #ff3333;
//     font-size: 0.875rem;
//     font-weight: bold;
//     margin-top: 0.5rem;
// `;
export const Input = styled.input`
    width: 100%;
    padding: 10px;
    margin-top: 10px;
    border: 1px solid #ddd;
    border-radius: px;
    font-size: 16px;
`;

export const Button = styled.button`
    margin-top: 26px;
    padding: 10px;
    background: var(--primary-color);
    color: white;
    font-size: 16px;
    font-weight: bold;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    width: 100%;

    &:hover {
        background: var(--primary-600);
    }
`;
