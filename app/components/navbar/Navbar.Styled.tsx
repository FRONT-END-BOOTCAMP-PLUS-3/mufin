import styled from "styled-components";

export const NavbarContainer = styled.div`
  max-width: var(--background-width);
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  background-color: var(--primary-light);
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 60px;
`;

export const NavbarItem = styled.div<{ $isActive?: boolean }>`
  margin-bottom: 0.5rem;
  a {
    display: flex;
    color: ${(props) => (props.$isActive ? `var(--primary-color)` : `inherit`)};
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: var(--font-size-sm);
    gap: 0.2rem;
  }
`;
