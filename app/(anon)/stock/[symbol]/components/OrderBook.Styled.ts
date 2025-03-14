import styled from "styled-components";

export const OrderBookContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 0.75rem 0.9375rem;
  margin-top: auto;
  display: flex; 
  flex-direction: column; 
  flex-grow: 1; 
  overflow-y: scroll;
`;

export const OrderBookTable = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 5px;
`;

export const OrderRow = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

export const Price = styled.span`
  width: 6rem;
  text-align: right;
  font-size: 0.875rem;
  padding-right: 0.625rem;
`;

export const OrderDetails = styled.div`
  display: flex;
  align-items: center;
  gap: 0.625rem;
  position: relative;
  flex: 1;
  padding-left: 0.625rem;
  border-left: 1px solid var(--disabled-color);
`;

export const OrderBar = styled.div<{ width: number }>`
  height: 1.5rem;
  width: ${({ width }) => width}%;
  background-color: ${({ className }) => (className === "ask" ? "#abdfdf" : "#ffb3c2")};
  border-radius: 0.2rem;
`;

export const Volume = styled.span<{ $className: "ask" | "bid" }>`
  font-size: 0.875rem;
  color: ${({ $className }) => ($className === "ask" ? "var(--primary-color)" : "var(--second-color)")};
`;