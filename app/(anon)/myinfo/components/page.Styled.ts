import { styled } from "styled-components";

export const Container = styled.div`
  display: flex;
  text-align: center;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
`;

export const MyBox = styled.div`
  display: flex;
  border: 1px solid var(--disabled-color);
  border-radius: 10px;
  width: 80%;
  align-items: center;
  height: 5rem;
  justify-content: space-around;
  font-size: var(--font-size-2xl);
  letter-spacing: -0.5px;
  img {
    margin-right: -1.5rem;
  }
`;

export const LoginBox = styled.div`
  display: flex;
  border: 1px solid var(--disabled-color);
  flex-direction: column;
  border-radius: 10px;
  width: 80%;
  align-items: center;
  height: 11rem;
  justify-content: center;
  font-size: var(--font-size-xl);
  gap: 1rem;
`;

export const Button = styled.button`
  background-color: var(--primary-light);
  border: var(--disabled-color);
  border-radius: 10px;
  height: 4rem;
  width: 70%;
`;
