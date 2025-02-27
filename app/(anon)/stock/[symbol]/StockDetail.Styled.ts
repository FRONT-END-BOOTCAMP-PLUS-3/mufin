"use client";

import styled from "styled-components";

export const StockContainer = styled.div`
  padding: 50px 20px ;
`;

export const StockInfo = styled.section`
  padding: 0 16px;
  margin-bottom: 8px;
`;

export const StockName = styled.h1`
  font-size: 22px;
  margin: 4px 0;
`;

export const StockPrice = styled.h2`
  font-size: 20px;
  margin: 4px 0;
`;

export const StockDiff = styled.p`
  font-size: 12px;
  color: var(--gray-700);
  margin: 4px 0 10px 0;

  span {
    color:rgb(13, 0, 255);
    font-weight: bold;
  }
`;

export const TabMenu = styled.nav`
  display: flex;
  justify-content: space-around;
  border-bottom: 1px solid var(--disabled-color);
  margin-bottom: 15px;
`;

export const TabItem = styled.div<{ $active?: boolean }>`
  flex: 1;
  text-align: center;
  padding: 12px 0;
  font-size: 14px;
  font-weight: ${({ $active }) => ($active ? 'bold' : 'normal')};
  color: ${({ $active }) => ($active ? 'var(--black-color)' : 'var(--gray-900)')};
  border-bottom: ${({ $active }) => ($active ? '2px solid var(--black-color)' : 'none')};
  cursor: pointer;
`;

export const ChartContainer = styled.section`
  padding: 16px;
`;

export const PeriodSelector = styled.div`
  display: flex;
  justify-content: center;
  margin: 8px 0;
`;

export const PeriodItem = styled.button<{ $active?: boolean }>`
  background: none;
  border: none;
  font-size: 14px;
  padding: 8px 26px;
  margin: 0 4px;
  color: ${({ $active }) => ($active ? 'var(--black-color)' : 'var(--gray-900)')};
  font-weight: ${({ $active }) => ($active ? 'bold' : 'normal')};
`;