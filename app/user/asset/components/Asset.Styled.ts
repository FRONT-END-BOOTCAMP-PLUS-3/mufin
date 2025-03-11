import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 30rem;
    margin: 0 auto;
    padding: 1.25rem;
`;

export const InvestmentGoal = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
`;

export const GoalText = styled.span`
    font-size: var(--font-size-xl); 
    font-weight: bold;
`;

export const RightContainer2 = styled.div`
    display: flex;
    align-items: center;
    gap: 0.625rem;
`;

export const GoalAmount = styled.span`
    font-size: var(--font-size-xl); 
    font-weight: bold;
`;

export const ProgressBarContainer = styled.div`
    width: 100%;
    height: 1.75rem;
    background: var(--background-color);;
    border-radius: 0.75rem; 
    margin: 0.625rem 0; 
    position: relative;
    overflow: hidden;
`;

export const Progress = styled.div<{ progress: number }>`
    width: ${({ progress }) => progress}%;
    height: 100%;
    background: var(--second-300);
    border-radius: 0.75rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75rem;
    font-weight: bold;
    color: var(--white-color);
`;

export const TotalAssetsSection = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 1.25rem 0; 
    border-bottom: 1px solid var(--disabled-color);
`;

export const TotalText = styled.span`
    font-size: 1.375rem; 
    font-weight: bold;
`;

export const TotalValue = styled.span`
    font-size: 1.375rem;
    font-weight: bold;
`;

export const AccountSection = styled.div`
    width: 100%;
    background: var(--primary-light);
    padding: 1rem; 
    border-radius: 0.75rem; 
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
    justify-content: center;
`;

export const AccountTitle = styled.span`
    font-size:var(--font-size-xl);
    font-weight: bold;
`;

export const AccountValue = styled.span`
    font-size: var(--font-size-2xl);
    font-weight: bold;
    margin-top: 0.5rem;
`;

export const TransferButton = styled.button`
    margin-top: 0.75rem;
    padding: 0.5rem 0.75rem;
    background: var(--primary-color);
    color: white;
    font-size: var(--font-size-base);
    font-weight: bold;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    &:hover {
        background: var(--primary-600);
    }
`;

export const ProfitText = styled.p`
    color: var(--second-color);
    font-size: var(--font-size-base);
    font-weight: bold;
    margin-top: 0.5rem;
`;
export const Input = styled.input`
    width: 100%;
    padding: 10px;
    margin-top: 20px;
    border: 1px solid var(--disabled-color);
    border-radius: 10px;
    font-size: var(--font-size-lg);
`;

export const Button = styled.button`
    margin-top: 20px;
    padding: 10px;
    background: var(--primary-color);
    color: white;
    font-size: var(--font-size-lg);
    font-weight: bold;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    width: 100%;

    &:hover {
        background: var(--primary-600);
    }
`;
