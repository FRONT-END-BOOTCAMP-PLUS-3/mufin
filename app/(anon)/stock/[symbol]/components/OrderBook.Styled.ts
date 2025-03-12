import styled from "styled-components";

export const OrderBookContainer = styled.div`
  width: 100%;
  padding: 12px 15px;
  margin-top: 5px;
`;

export const OrderBookTable = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const OrderRow = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

export const Price = styled.span`
  width: 80px;
  text-align: right;
  font-size: 14px;
  padding-right: 10px;
`;

export const OrderDetails = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  position: relative;
  flex: 1;
  padding-left: 10px;
  border-left: 1px solid var(--disabled-color);
`;

export const OrderBar = styled.div<{ width: number }>`
  height: 20px;
  width: ${({ width }) => width}%;
  background-color: ${({ className }) => (className === "ask" ? "var(--primary-300)" : "var(--second-300)")};
  border-radius: 5px;
`;

export const Volume = styled.span<{ $className: "ask" | "bid" }>`
  font-size: 14px;
  color: ${({ $className }) => ($className === "ask" ? "var(--primary-color)" : "var(--second-color)")};
`;