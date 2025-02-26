"use client";

import styled from "styled-components";

export const StockInfo = styled.section`
  padding: 0 16px;
  margin-bottom: 8px;
`;

export const StockName = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin: 4px 0;
`;

export const StockPrice = styled.p`
  font-size: 24px;
  font-weight: bold;
  margin: 4px 0;
`;

export const StockDiff = styled.p`
  font-size: 14px;
  color: #999;
  margin: 4px 0;

  span {
    color: #e53935; /* 상승 시 빨간색 */
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
  font-weight: ${({ $active }) => ($active ? 'bold' : 'normal')};
  color: ${({ $active }) => ($active ? '#000' : '#666')};
  border-bottom: ${({ $active }) => ($active ? '2px solid #000' : 'none')};
  cursor: pointer;
`;

export const ChartContainer = styled.section`
  padding: 16px;
`;

export const ChartImage = styled.div`
  position: relative;
  height: 200px;
  border: 1px solid #eee;
  border-radius: 8px;
  overflow: hidden;
`;

export const ChartLabelTop = styled.span`
  position: absolute;
  top: 8px;
  left: 8px;
  font-size: 12px;
  color: var(--gray-700);
`;

export const ChartLabelBottom = styled.span`
  position: absolute;
  bottom: 8px;
  left: 8px;
  font-size: 12px;
  color: var(--gray-700);
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
  padding: 8px 20px;
  margin: 0 4px;
  color: ${({ $active }) => ($active ? '#000' : '#666')};
  font-weight: ${({ $active }) => ($active ? 'bold' : 'normal')};
`;

export const TradeButton = styled.button`
  width: calc(100% - 32px);
  margin: 16px;
  padding: 16px;
  background-color: #007aff;
  color: #fff;
  font-size: 16px;
  border: none;
  border-radius: 8px;
`;