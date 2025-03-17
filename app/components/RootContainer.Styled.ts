import styled from "styled-components";

export const RootContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;

  width: 100%;
  max-width: var(--background-width);
  height: 100vh;
  
  background-color: var(--white-color);
  color: var(--black-color);
`;

export const ContentContainer = styled.main<{ $hasNavbar: boolean }>`
  display: flex;
  flex: 1;
  position: relative;
  overflow-y: auto;
  flex-direction: column;
  margin-top: 70px;
  padding-bottom: ${({ $hasNavbar }) => ($hasNavbar ? "80px" : "0")};
  background-color: var(--white-color);
`;
