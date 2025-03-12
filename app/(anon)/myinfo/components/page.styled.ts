import { styled } from "styled-components";

export const Container = styled.div`
  margin-top: 50px;
  display: flex;
  text-align: center;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
`;

export const MyBox = styled.div`
  display: flex;
  flex-direction: column; 
  align-items: center; 
  border-radius: 10px;
  width: 80%;
  height: 10rem;
  justify-content: center; 
  font-size: var(--font-size-2xl);
  letter-spacing: -0.5px;

  img {
    margin-bottom: 0.5rem; 
  }
`;

export const LoginBox = styled.div`
  display: flex;
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
  height: 3rem;
  width: 70%;
`;

export const ModalStyle = styled.div`
  p {
    font-size: var(--font-size-2xl);
  }
  margin: 1.5rem;
`;

export const ButtonStyle = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
`;
