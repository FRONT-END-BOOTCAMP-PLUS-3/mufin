import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";

export const SearchContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 1rem 1.25rem 1.25rem 1.25rem;  
    justify-content: space-between;
    gap: 0.5rem;
    width: 100%;
    position: relative; 
`;

export const SearchBarWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between; 
    padding: 0.2rem 0.4rem;
    background-color: var(--primary-light);
    border-radius: 10px;
    position: absolute; 
    top: 1rem;
    left: 50%;
    transform: translateX(-50%);
    width: 90%;
`;

export const SearchInput = styled.input`
    flex: 1; 
    padding: 0.5rem;
    font-size: 1rem;
    border: none;
    outline: none;
    background: transparent;
    text-align: left;
    cursor: pointer;
    min-width: 100px;
`;

export const SearchButton = styled.button`
    flex-shrink: 0;
    padding: 0.5rem;
    border: none;
    background-color: var(--primary-light);
    cursor: pointer;
    white-space: nowrap;
    min-width: 60px;
`;

export const SearchContentWrapper = styled.section`
    width: 100%;
    margin-bottom: 1rem;
    padding: 0 0.625rem;
    margin-top: 4rem; 
`;

export const StockLink = styled(Link)`
    display: flex;
    align-items: center;
    width: 100%;
    padding: 0.5rem 0.5rem 0.5rem 0 ;
    color: inherit;
    cursor: pointer;
    &:hover {
        background-color: var(--gray-50);
    }
`;

export const LogoWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    overflow: hidden;
`;

export const StockImage = styled(Image)`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

export const StockName = styled.div`
    margin-left: 1rem;
    font-size: var(--font-size-xl);
    color: var(--black-color);
    font-weight: 500;
`;

export const HighlightedText = styled.span`
    color: var(--primary-color); 
`;

export const NoResultsContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 400px;
    border-radius: 10px;
    padding: 2rem;
    text-align: center;
    color: var(--gray-700);
`;

export const Message = styled.p`
    font-size: var(--font-size-2xl);
    font-weight: bold;
    margin-top: 1rem;
`;