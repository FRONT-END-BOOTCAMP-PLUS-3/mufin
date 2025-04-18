"use client";
 
import styled from "styled-components";

export const TransferContainer = styled.div`
  padding: 0 1.25rem 1.25rem 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const TransferTitle1 = styled.h2`
  font-size: var(--font-size-xl);
  font-weight: bold;
  margin-top: 1.25rem;
  color: var(--black-color);
  margin-left: 0.5rem;
`;

export const TransferTitle2 = styled.h2`
  font-size: var(--font-size-3xl);
  font-weight: bold;
  margin-bottom: 1.25rem;
  color: var(--primary-color);
  margin-left: 0.5rem;
`;

export const TransferContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  border-radius: 0.625rem; 
  background-color: var(--primary-light);
  padding: 2rem 1.25rem 1rem 1.25rem;

  .row-container {
    display: flex;
    flex-direction: row; 
    justify-content: space-between; 
    width: 100%; 
    gap: 1rem; 
    border-bottom: 0.0625rem solid var(--gray-200); 
    flex-wrap: wrap;
  }

  .label {
    display: flex;
    font-size: var(--font-size-lg);
    padding: 0.5rem; 
  }

  .label2 {
    font-size: var(--font-size-base);
    padding: 0.5rem; 
    align-self: flex-end; 
  }

  input {
    display: flex;
    padding: 0.5rem;
    margin-right: 1rem;
    font-size: var(--font-size-lg);
    font-weight: bold;
    text-align: right; 
    border: none;
    caret-color: var(--primary-color); 
    flex: 1;  
    background-color: var(--primary-light);
    max-width: 60%;
  }

  .error-container {
    height: 2rem;
    width: 100%;
    display: flex;
  }

  .currency {
    position: absolute;
    padding: 0.5rem; 
    right: 0.8rem;
    font-size: var(--font-size-lg);
    color: var(--black-color);
  }
`;

export const WalletError = styled.p`
  font-size: var(--font-size-base); 
  color: var(--second-color);
  align-self: flex-end; 
  margin-right: 0.5rem;
  margin-left: auto;
  font-weight: bold;
`;

export const QuantityControl = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.625rem; 
  position: relative;
  margin: auto 0.625rem; 

  .keypad {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.625rem; 
    width: 90%;
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
  width: 80%; 
  height: 3rem; 
  margin-top: 1.25rem; 
  position: fixed;
  bottom: 3rem;
  left: 50%; 
  transform: translateX(-50%); 
  border: none;
  border-radius: 0.625rem; 
  background-color: var(--primary-color);
  color: var(--white-color);
  max-width: 400px;
`;