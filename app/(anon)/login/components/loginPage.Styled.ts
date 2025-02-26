import styled from "styled-components";

export const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 100vh;
`;

export const LoginBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 70%;
  padding: 2rem;
  background: white;
  border-radius: 10px;

  h1 {
    margin-bottom: 1.5rem;
    font-size: 1.5rem;
  }

  form {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 1rem;
    align-items: center;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 10px;
  font-size: 1rem;
  height: 4rem;
`;

export const Button = styled.button`
  width: 60%;
  padding: 10px;
  border: none;
  background-color: var(--primary-color);
  color: white;
  font-size: 1rem;
  border-radius: 10px;
`;
