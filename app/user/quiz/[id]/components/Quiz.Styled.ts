import styled from "styled-components";

export const QuizContainer = styled.section`
display: flex;
flex-direction: column;
    width: 100%;
    height: 100%;
    padding: 20px;
`;

export const ProgressWrapper = styled.div`
    width: 100%;
    height: 20px;
    border-radius: 50px;
    background: repeating-linear-gradient(
      45deg, 
      rgba(255, 255, 255, 0.2) 0px, 
      rgba(255, 255, 255, 0.2) 10px, 
      var(--primary-light) 10px, 
      var(--primary-light) 20px
    ), 
    linear-gradient(to right, #4a90e2, #357abd);
    background-size: 200% 100%;

`;

export const QuizText = styled.h6`
    word-wrap: break-word;
    white-space: pre-line;

`;

export const QuizButtonWrapper = styled.div`
  display: flex;
  flex : 1;
  justify-content: space-around;
  align-items: center;
  padding: 10px;
  width: 100%;
`;

export const SelectButton = styled.button`
    padding: 10px;
    height: 10rem;
    width: 10rem;
    border: none;
    background-color: var(--background-color);
    border-radius: 10px;

`;

export const ResultButtonWrapper = styled.div``;