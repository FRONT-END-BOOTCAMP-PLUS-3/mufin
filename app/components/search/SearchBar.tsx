"use client";
import { SearchContainer, SearchText } from "./SearchBar.Styled";
import { Search } from "lucide-react";

export const SearchBar = () => {
    return (
        <SearchContainer href="/search">
            <SearchText>종목을 검색해보세요</SearchText>
            <Search size={20} color="var(--primary-color)" />
        </SearchContainer>
    );
};
