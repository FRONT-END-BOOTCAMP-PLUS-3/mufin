"use client";
 
import styled from "styled-components";

export const SummaryContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 20px;
  border-top: 2px solid #ddd;
  margin-top: 20px;
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  background: #fff;
`;


export const TabsContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  margin-bottom: 20px;
`;

export const Tab = styled.button<{ $active: boolean }>`
  flex: 1;
  padding: 10px;
  font-size: 16px;
  font-weight: bold;
  border: none;
  background: ${({ $active }) => ($active ? "#007bff" : "#ddd")};
  color: ${({ $active }) => ($active ? "#fff" : "#000")};
  cursor: pointer;
  transition: background-color 0.3s;
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background: #f9f9f9;
`;

export const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  button {
    width: 30px;
    height: 30px;
    border: none;
    background: #007bff;
    color: #fff;
    font-size: 18px;
    cursor: pointer;
    border-radius: 5px;
  }
`;

export const PriceText = styled.p`
  font-size: 18px;
  font-weight: bold;
  margin: 10px 0;
`;
