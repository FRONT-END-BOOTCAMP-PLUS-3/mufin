import styled from "styled-components";

export const SignupContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-self: center;

  width: 80%;
  padding: 2rem;
  gap: 1rem;

  h1 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
`;

export const Input = styled.input`
  width: 100%;
  height: 3rem;

  padding: 1rem;
  
  border: 1px solid var(--gray-200);
  border-radius: 10px;
  
  text-align: left;
  cursor: text;
`;

export const EmailContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 1rem;
  button {
    width: 20%;
    padding: 2px 4px;
    font-size: var(--font-size-md);
    background-color: var(--primary-color);
    color: var(--white-color);
    border: none;
    border-radius: 10px;
  }
`;

export const EmailInput = styled.input`
  width: 80%;
  height: 3rem;

  padding: 1rem;
  
  border: 1px solid var(--gray-200);
  border-radius: 10px;
  
  text-align: left;
`;


export const Verified = styled.div`
  display: grid;
  place-items: center;
  color: var(--primary-color);
  width: 20%;

  svg {
    font-size: 40px;
  }
`;

export const Message = styled.p`
  margin-top: 1rem;
  font-size: 14px;
  color: red;
  width: 30%;
`;
