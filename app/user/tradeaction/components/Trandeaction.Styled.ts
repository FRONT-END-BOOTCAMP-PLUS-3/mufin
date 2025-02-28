"use client";
 
import styled from "styled-components";

export const TrandeacionContainer = styled.div`
  padding: 50px 20px;
`;

export const TabsContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  margin-bottom: 20px;
  border-bottom: 1px solid var(--disabled-color);
`;

export const Tab = styled.button<{ $active: boolean }>`
  flex: 1;
  text-align: center;
  padding: 10px;
  font-size: 16px;
  border: none;
  background-color: var(--white-color);
  font-weight: ${({ $active }) => ($active ? 'bold' : 'normal')};
  color: ${({ $active }) => ($active ? 'var(--black-color)' : 'var(--gray-900)')};
  border-bottom: ${({ $active }) => ($active ? '2px solid var(--black-color)' : 'none')};
`;

export const FormContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  padding: 20px;
  background-color: var(--primary-light);
  border-radius: 10px;
`;

export const QuantityControlTitle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  padding: 20px;
  border-radius: 10px;

  background-color: var(--primary-light);

  .row-container {
    display: flex;
    flex-direction: row; 
    justify-content: space-between; 
    width: 100%; 
    gap: 10px;
    border-bottom: 1px solid var(--gray-200);
  }

  .label {
    font-size: 16px;
    padding: 8px;
    flex: 1;
  }

  .label2 {
    font-size: 18px;
    font-weight: bold;
    padding: 8px;
    align-self: flex-end; 
  }

  input {
    padding: 8px;
    font-size: 16px;
    font-weight: bold;
    text-align: right; 
    border: none;
    caret-color: var(--primary-color); 
    flex-grow: 1; 
    background-color: var(--primary-light);
  }
`;


export const PriceText = styled.p`
  font-size: 16px;
  font-weight: bold;
`;

export const QuantityControl = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  position: relative;
  margin-right: 10px;
  margin-left: 10px;

  .keypad {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    width: 90%;
    margin-top: 10px;
    padding: 10px 0px;
    border-radius: 10px;
  }

  .keypad button {
    padding: 10px;
    font-size: 26px;
    border: none;
    background-color: var(--white-color);
  }

  .keypad button:active {
    border-radius: 10px;
    background-color: var(--background-color);
  }

  .delete {
    color: white;
  }
`;

export const MainButton = styled.div<{ $isBuy: boolean }>`
  display: flex;
  justify-content: center; 
  align-items: center;
  gap: 10px;
  width: 70%; 
  height: 40px;
  margin: 0 auto;
  margin-top: 20px;
  border: none;
  border-radius: 10px;
  background-color: ${({ $isBuy }) => ($isBuy ? "var(--second-color)" : "var(--primary-color)")};
  color: var(--white-color);
`;

//Modal Style
export const ModalContainer = styled.div`
  max-width: 100%;
  padding: 20px;
  border-radius: 10px;
  color: var(--black-color);
`;

export const Title = styled.h3`
  font-size: 20px;
  text-align: center;
  margin-bottom: 5px;
`;

export const SubTitle = styled.div<{ $isBuy : boolean }>`
  font-size: 24px;
  text-align: center;
  margin-bottom: 30px;
  font-weight: bold;
  
  .quantity {
    color: var(--black-color);
  }

  .action {
    color: ${({ $isBuy }) => ($isBuy ? "var(--second-color)" : "var(--primary-color)")}; 
    margin-left: 5px;
  }
`;

export const InfoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const InfoItem = styled.p`
  display: flex;
  justify-content: space-between;
  font-size: 18px;
`;

export const TotalPrice = styled(InfoItem)`
  padding-top: 10px;
  font-size: 18px;
`;

export const ModalButton = styled.div<{ $isBuy: boolean }>`
  display: flex;
  justify-content: center; 
  align-items: center;
  gap: 10px;
  width: 70%; 
  height: 40px;
  margin: 0 auto;
  margin-top: 40px;
  border: none;
  border-radius: 10px;
  background-color: ${({ $isBuy }) => ($isBuy ? "var(--second-color)" : "var(--primary-color)")};
  color: var(--white-color);
`;