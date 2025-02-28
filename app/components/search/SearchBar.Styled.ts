import styled from "styled-components";
import Link from "next/link";

export const SearchContainer = styled(Link)`
    width: 100%;
    max-width: 410px; /* 서치바 너비 조정 */
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 16px;
    border: 1px solid var(--gray-300);
    border-radius: 30px;
    background-color: white;
    cursor: pointer; /* 클릭 가능하도록 설정 */
    transition: 0.2s;

    &:hover {
        background-color: var(--gray-50);
    }
`;

export const SearchText = styled.div`
    font-size: 1rem;
    color: var(--gray-500);
    flex: 1; /*텍스트 영역이 확장됨 */
`;
