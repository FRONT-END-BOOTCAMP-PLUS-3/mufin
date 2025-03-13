import styled from "styled-components";

export const QuizContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  position: relative;

  width: 100%;
  height: 100%;
  min-height: 100%;

  margin-top: 1.25rem;
  padding: 0 1.25rem 1.25rem 1.25rem;
  gap: 1.25rem;
  background-color: var(--white-color);

  overflow-y: scroll;
`;

export const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  position: sticky;
  top: 0;

  width: 100%;

  background-color: var(--white-color) ;

  text-align: left;
  word-wrap: break-word;
  white-space: pre-wrap;

  .quiz__current {
    display: block;

    width: 100%;

    margin-bottom: 1rem;
    padding-left: 0.625rem;

    font-size: var(--font-size-2xl);
    color: var(--primary-color);
  }

  .quiz__question {
    display: block;

    width: 100%;

    margin-top: 1.875rem;
    padding: 0 1.25rem 1.25rem 1.25rem;

    font-size: var(--font-size-3xl);
  }
`;

export const QuizButtonWrapper = styled.div<{ $direction: "row" | "column" }>`
  display: flex;
  flex-direction: ${({ $direction }) => $direction};
  justify-content: space-between;
  align-items: center;

  width: 100%;

  padding: 0.625rem;
  gap: 1.875rem;
`;

export const OXSelectButton = styled.button<{ $isActive: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;

  
  height: 10rem;
  width: 10rem;

  padding: 0.625rem;

  background-color: ${({ $isActive }) => $isActive ? "var(--primary-200)" : "var(--background-color)"};
  color: ${({ $isActive }) => ($isActive ? "var(--white-color)" : "")};

  border: none;
  border-radius: 10px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
`;

export const OptionButton = styled.button<{ $isActive: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;

  width: 100%;
  min-height: 5rem;
  height: auto;

  padding: 1.25rem;

  font-size: var(--font-size-xl);
  font-weight: bold;

  background-color: ${({ $isActive }) => $isActive ? "var(--primary-200)" : "" };
  color: ${({ $isActive }) => ($isActive ? "white" : "")};

  word-break: break-word;
  white-space: pre-wrap;

  border: none;
  border-radius: 1.25rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
`;
