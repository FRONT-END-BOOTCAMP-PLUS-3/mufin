import styled from "styled-components";

export const ResultContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    width: 100%;
    height: 100%;

    padding: 1.25rem 1.25rem 3rem 1.25rem;
`;


export const ResultTopWrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex:1;
    justify-content: center;
    align-items: center;
    margin-bottom: 5rem;

    width: 100%;

    padding: 1.25rem;
    gap: 2.5rem;

    .result__status{
        font-size: 2rem;
        font-weight: bold;

        white-space: normal;
        word-wrap: break-word;
        color: var(--primary-color);
        text-align:center;
    }

    .result__description{
        font-size: var(--font-size-2xl);
    }

    .result__totalPrice{
        font-size: var(--font-size-5xl);
        font-weight: bold;
        color: var(--primary-color);
    }
`

export const ButtonWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    width: 100%;
`;