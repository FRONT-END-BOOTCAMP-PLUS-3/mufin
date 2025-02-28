"use client";
import Image from "next/image"; // ✅ Next.js 최적화된 이미지 사용
import { SearchContainer, SearchText } from "./SearchBar.Styled";

export const SearchBar = () => {
    return (
        <SearchContainer href="/search">
            <SearchText>종목을 검색해보세요</SearchText>
            <Image src="/searchIcon.svg" alt="Search" width={20} height={20} />
        </SearchContainer>
    );
};
