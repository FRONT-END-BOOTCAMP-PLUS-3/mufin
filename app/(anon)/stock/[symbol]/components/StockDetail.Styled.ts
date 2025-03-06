"use client";

import styled from "styled-components";

export const StockContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 1.25rem 1.25rem 1.25rem;  
  min-height: 100%;
  justify-content: space-between;
`;

export const StockTitleWrapper = styled.section`
  display: flex;
  flex-direction: column;
  padding: 0 1rem;
  margin-bottom: 0.5rem; 
  gap: 0.25rem;
`;

export const StockName = styled.h1`
  font-size: var(--font-size-2xl);
`;

export const StockPrice = styled.h2`
  font-size: var(--font-size-2xl);
`;

export const StockDiff = styled.p`
  font-size: var(--font-size-md);
  color: var(--gray-700);

  span {
    color: rgb(13, 0, 255);
    font-weight: bold;
  }
`;

export const TabMenu = styled.nav`
  display: flex;
  justify-content: space-around;
  border-bottom: 0.063rem solid var(--disabled-color);
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
  padding: 1rem 0.25rem 1rem 0.25rem;
  min-height: 432px;
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

export const OrderBookWrapper = styled.section`
  display: flex;
  flex-direction: column;
  flex: 1;
  text-align: center;
`;

export const StockInfoWrapper = styled.section`
  display: flex;
  flex-direction: column;
  flex: 1;
  text-align: center;
`;

export const Table = styled.table`
  width: 90%;
  border-collapse: collapse;
  border: 1px solid var(--disabled-color);
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: auto;
  margin-right : auto;
`;

export const TableCell1 = styled.td`
  padding: 10px;
  text-align: left;
  border: 1px solid var(--disabled-color);
  background-color: var(--primary-light);
`;

export const TableCell2 = styled.td`
  padding: 10px;
  text-align: left;
  border: 1px solid var(--disabled-color);
`;

export const ButtonComponenet = styled.div`
  margin-top: 1rem;
  text-align: center;
  border: none;
  background-color: var(--white-color);
`;

export const StockErrorModal = styled.button`
  align-items: center;
`;

export const DraggableScrollWepper = styled.div<{ $isDragging: boolean }>`
  overflow-x: auto;
  cursor: ${({ $isDragging }) => ($isDragging ? 'grabbing' : 'grab')};
  width: 100%;
  height: 30rem;
`;

export const ChartSection = styled.section`
  width: 75rem;
  height: 100%;
`;


export const ChartImageContainer = styled.div`
  width: 100%;
  height: 30rem;
  overflow-x: auto;
`;
