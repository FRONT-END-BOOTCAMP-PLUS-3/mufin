import styled from "styled-components";

export const HeaderContainer = styled.header`
    display: flex;
    align-items: center;
    width: 100%;
    max-width: var(--background-width);
    height: 70px;
    padding: 20px 10px 20px 10px;
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    z-index: 100;
`;

export const HeaderWrapper = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    padding: 0 1.25rem;

    h6 {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
    }
`;

export const HeaderLogo = styled.div`
    display: inline-flex;
    justify-content: center;
    align-items: center;
    height: auto;
    cursor: pointer;
`;

export const BackButtonBox = styled.div`
    display: inline-flex;
    height: 100%;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`;
