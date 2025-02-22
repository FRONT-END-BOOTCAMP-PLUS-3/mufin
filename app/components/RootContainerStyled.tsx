import styled from "styled-components";

export const RootContainer = styled.div`
  display:flex;
  flex-direction: column;
  position:relative;
  width: 100%;
  max-width: 390px;
  height: 100vh;
  margin: 0 auto;
  display: flex;
`;

export const ContentContainer = styled.main`
  display: flex;
  flex: 1;
  overflow-y: auto;
  flex-direction: column;
  margin-top:70px;
  background-color:red;
`;
