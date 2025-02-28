"use client";

import styled from "styled-components";

export const StockContainer = styled.div`
  padding: 1.25rem;
`;

export const StockInfo = styled.section`
  padding: 0 1rem;
  margin-bottom: 0.5rem; 
`;

export const StockName = styled.h1`
  font-size: var(--font-size-2xl);
  margin: 0.25rem 0;
`;

export const StockPrice = styled.h2`
  font-size: var(--font-size-2xl);
  margin: 0.25rem 0;
`;

export const StockDiff = styled.p`
  font-size: var(--font-size-md);
  color: var(--gray-700);
  margin: 0.25rem 0 0.625rem 0;

  span {
    color: rgb(13, 0, 255);
    font-weight: bold;
  }
`;

export const TabMenu = styled.nav`
  display: flex;
  justify-content: space-around;
  border-bottom: 0.063rem solid var(--disabled-color);
  margin-bottom: 1.563rem;
`;

export const TabItem = styled.div<{ $active?: boolean }>`
  flex: 1;
  text-align: center;
  padding: 0.75rem 0;
  font-size: var(--font-size-base);
  font-weight: ${({ $active }) => ($active ? 'bold' : 'normal')};
  color: ${({ $active }) =>
    $active ? 'var(--black-color)' : 'var(--gray-900)'};
  border-bottom: ${({ $active }) =>
    $active ? '0.125rem solid var(--black-color)' : 'none'};
  cursor: pointer;
`;

export const ChartContainer = styled.section`
  padding: 1rem;
`;

export const PeriodSelector = styled.div`
  display: flex;
  justify-content: center;
  margin: 0.5rem 0;
`;

export const PeriodItem = styled.button<{ $active?: boolean }>`
  background: none;
  border: none;
  font-size: var(--font-size-base); 
  padding: 0.5rem 1.4rem; 
  margin: 0 0.3rem;
  color: ${({ $active }) =>
    $active ? 'var(--black-color)' : 'var(--gray-900)'};
  font-weight: ${({ $active }) => ($active ? 'bold' : 'normal')};
`;

export const ButtonComponenet = styled.div`
  margin-top: 2rem;
  text-align: center;
  border: none;
  background-color: var(--white-color);
`;
