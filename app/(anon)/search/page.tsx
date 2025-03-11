"use client";

import React, { useState } from "react";
import styled from "styled-components";
import { Search } from "lucide-react";

const SearchPage = () => {
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <Container>
            <SearchBarWrapper>
                <SearchInput
                    type="text"
                    placeholder="종목을 검색해보세요"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <SearchIcon>
                    <Search size={22} color="var(--gray-400)" />
                </SearchIcon>
            </SearchBarWrapper>

            {/* 검색 결과 리스트는 추후 추가 */}
        </Container>
    );
};

// 🔹 Styled Components
const Container = styled.div`
    width: 100%;
    max-width: 25rem;
    margin: 0 auto;
    padding: 0;
    display: flex;
    flex-direction: column;
`;

const SearchBarWrapper = styled.div`
    display: flex;
    align-items: center;
    padding: 0.4rem;
    border: 0.06rem solid var(--gray-100);
    border-radius: 10px;
    background: white;
    width: 100%;
    max-width: 29rem;
    margin: 0 auto;
    position: fixed;
    top: 4rem;
    left: 50%;
    transform: translateX(-50%);
`;

const SearchInput = styled.input`
    flex: 1;
    padding: 0.5rem;
    font-size: 1rem;
    border: none;
    outline: none;
    background: transparent;
    text-align: left;
`;

const SearchIcon = styled.div`
    width: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export default SearchPage;
