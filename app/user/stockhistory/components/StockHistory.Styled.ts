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

export const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
  width: 100px;
`;

export const SelectedValue = styled.div`
  padding: 0.625rem;
  border: none;
  cursor: pointer;
  font-size: var(--font-size-base);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const DropdownList = styled.ul`
  position: absolute;
  width: 100%;
  max-height: 12.5rem;
  overflow-y: auto;
  background: var(--white-color);
  border: 1px solid var(--gray-200);
  border-radius: 0.3125rem;
  margin-top: 0.3125rem;
  list-style: none;
  box-shadow: 0px 0.25rem 0.375rem rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

export const DropdownItem = styled.li`
  padding: 0.375rem;
  font-size: var(--font-size-base);
  cursor: pointer;

  &:hover {
    background-color: var(--primary-300);
    color: var(--white-color);
  }
`;
