import styled from "styled-components";

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  width: 100%;
  height: 100%;

  margin-top: 3.125rem;
  
  h1 {
    margin-bottom: 2rem;
    font-size: 1.5rem;
  }

  form {
    display: flex;
    flex-direction: column;
    width: 80%;
    gap: 1rem;
    align-items: center;
  }
`;

export const Input = styled.input`
  width: 100%;
  height: 3rem;

  padding: 1rem;

  border: 1px solid var(--disabled-color);
  border-radius: 10px;
  
  font-size: 1rem;
  text-align: left;
  
  cursor: text;
`;

export const Button = styled.button`
  width: 100%;
  padding: 10px;
  border: none;
  background-color: var(--primary-color);
  color: white;
  font-size: 1rem;
  border-radius: 10px;
  margin-top: 1rem;
`;

