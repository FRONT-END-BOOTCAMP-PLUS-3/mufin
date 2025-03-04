import styled from "styled-components";

export const RootContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  max-width: var(--background-width);
  height: 100vh;
  margin: 0 auto;
  display: flex;
  background-color: var(--white-color);
  color: var(--black-color);
`;

export const ContentContainer = styled.main`
  display: flex;
  flex: 1;
  overflow-y: auto;
  flex-direction: column;
  margin-top: 70px;
`;
