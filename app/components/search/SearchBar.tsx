"use client";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import Image from "next/image"; // ✅ Next.js 최적화된 이미지 사용
import { SearchContainer, SearchText } from "./SearchBar.Styled";

export const SearchBar = () => {
    const router = useRouter();

    // 검색창 클릭 시 검색 페이지 이동
    const handleClick = () => {
        router.push("/search");
    };

    return (
        <SearchContainer onClick={handleClick}>
            <SearchText>종목을 검색해보세요</SearchText>
            <Image src="/searchIcon.svg" alt="Search" width={20} height={20} />
        </SearchContainer>
    );
};
