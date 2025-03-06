import styled from "styled-components";

export const SignupContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 100vh;
  word-break: keep-all;
  h1 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: 2rem;
  border-radius: 10px;
  width: 80%;
  gap: 1rem;
  align-items: center;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--disabled-color);
  border-radius: 10px;
  height: 3rem;
  text-align: left;
`;

export const EmailContainer = styled.div`
  display: flex;
  gap: 1rem;
  button {
    font-size: var(--font-size-md);
    background-color: var(--primary-color);
    color: white;
    border: none;
    border-radius: 10px;
  }
`;

export const Button = styled.button`
  width: 70%;
  padding: 0.75rem;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 10px;
`;

export const Verified = styled.div`
  display: flex;
  background-color: #46ff5c;
  color: white;
  font-size: var(--font-size-md);
  border-radius: 10px;
  text-align: center;
  align-items: center;
  padding: 0.3rem;
`;

export const Message = styled.p`
  margin-top: 1rem;
  font-size: 14px;
  color: red;
`;
