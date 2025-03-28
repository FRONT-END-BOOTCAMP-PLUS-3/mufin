import styled from "styled-components";

export const TabMenuWrapper = styled.nav`
  display: flex;
  justify-content: space-around;
  border-bottom: 0.063rem solid var(--disabled-color);
`;

export const TabItemWrapper = styled.div<{ $active?: boolean }>`
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
