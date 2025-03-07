"use client";
 
import styled from "styled-components";

export const TransferContainer = styled.div`
  padding: 0 1.25rem 1.25rem 1.25rem;
`;

export const TabsContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  margin-bottom: 1.25rem; 
  border-bottom: 0.063rem solid var(--disabled-color);
`;

export const Tab = styled.button<{ $active: boolean }>`
  flex: 1;
  text-align: center;
  padding: 0.625rem;
  font-size: var(--font-size-lg);
  border: none;
  background-color: var(--white-color);
  font-weight: ${({ $active }) => ($active ? 'bold' : 'normal')};
  color: ${({ $active }) => ($active ? 'var(--black-color)' : 'var(--gray-900)')};
  border-bottom: ${({ $active }) => ($active ? '0.125rem solid var(--black-color)' : 'none')};
`;

export const FormContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.25rem; 
  padding: 1.25rem; 
  background-color: var(--primary-light);
  border-radius: 0.625rem;
`;

export const QuantityControlTitle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  padding: 1.25rem; 
  border-radius: 0.625rem; 
  background-color: var(--primary-light);

  .row-container {
    display: flex;
    flex-direction: row; 
    justify-content: space-between; 
    width: 100%; 
    gap: 0.625rem; 
    border-bottom: 0.0625rem solid var(--gray-200); 
  }

  .label {
    font-size: var(--font-size-lg);
    padding: 0.5rem; 
    flex: 1;
  }

  .label2 {
    font-size: var(--font-size-xl);
    font-weight: bold;
    padding: 0.5rem; 
    align-self: flex-end; 
  }

  input {
    padding: 0.5rem;
    font-size: var(--font-size-lg);
    font-weight: bold;
    text-align: right; 
    border: none;
    caret-color: var(--primary-color); 
    flex-grow: 1; 
    background-color: var(--primary-light);
  }
`;

export const PriceText = styled.p`
  font-size: var(--font-size-lg);
  font-weight: bold;
`;

export const QuantityControl = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.625rem; 
  position: relative;
  margin-right: 0.625rem; 
  margin-left: 0.625rem;

  .keypad {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.625rem; 
    width: 90%;
    margin-top: 0.625rem; 
    padding: 0.625rem 0;
    border-radius: 0.625rem;
  }

  .keypad button {
    padding: 0.625rem;
    font-size: var(--font-size-4xl); 
    border: none;
    background-color: var(--white-color);
  }

  .keypad button:active {
    border-radius: 0.625rem; 
    background-color: var(--background-color);
  }
`;

export const MainButton = styled.div`
  display: flex;
  justify-content: center; 
  align-items: center;
  gap: 0.625rem; 
  width: 70%; 
  height: 2.5rem; 
  margin: 0 auto;
  margin-top: 1.25rem; 
  border: none;
  border-radius: 0.625rem; 
  color: var(--white-color);
`;

export const WalletError = styled.p`
  font-size: var(--font-size-base); 
  color: var(--second-color);
  align-self: flex-end; 
  margin-right: 0.5rem;
`;