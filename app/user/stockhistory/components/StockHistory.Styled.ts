"use client";
 
import styled from "styled-components";

export const HistoryContainer = styled.div`
  padding: 0 1.25rem 1.25rem 1.25rem;
`;

export const HistoryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

export const HistoryTabMenu = styled.nav`
  display: flex;
  justify-content: space-around;
  border-bottom: 0.063rem solid var(--disabled-color);
  width: 100%;
`;

export const HistoryTabItem = styled.div<{ $active?: boolean }>`
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

export const HistoryTrem = styled.div`
  margin-left : 0.75rem;
  font-size: var(--font-size-base);
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const HistoryTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const Th = styled.th`
  padding: 0.75rem;
  text-align: center;
  font-weight: bold;
  top: 0; 
  z-index: 1;
  border-bottom: 0.063rem solid var(--disabled-color);
  width: 25%;
  font-size: var(--font-size-lg);
`;

export const Tr = styled.tr`
  &:nth-child(odd) {
    background-color: var(--primary-light);
  }
`;

export const Td = styled.td`
  padding: 0.75rem;
  text-align: center;
  width: 25%;
  font-size: var(--font-size-base);
`;

export const NoDataContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%; 
  width: 100%; 
`;

export const NoDataText = styled.div`
  font-size: var(--font-size-base);
  color: var(--gray-800);
  text-align: center;
  padding: 1rem;
`;