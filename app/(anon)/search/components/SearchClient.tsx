"use client";

import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { SearchContainer, SearchBarWrapper, SearchInput, StockLink, LogoWrapper, StockImage, StockName, SearchContentWrapper, SearchButton, HighlightedText } from "@/app/(anon)/search/components/Search.Styled";

const HighlightText = ({ text, query }: { text: string; query: string }) => {
    if (!query) return <>{text}</>;

    const regex = new RegExp(`(${query})`, "gi");
    const parts = text.split(regex);

    return (
        <>
            {parts.map((part, index) =>
                part.toLowerCase() === query.toLowerCase() ? (
                    <HighlightedText key={index}>{part}</HighlightedText>
                ) : (
                    part
                )
            )}
        </>
    );
};

const SearchClient = () => {
    const [searchTerm, setSearchTerm] = useState(""); 
    const [results, setResults] = useState([]);
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);  

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 1000); 

        return () => clearTimeout(timer);  
    }, [searchTerm]);

    useEffect(() => {
        if (debouncedSearchTerm.trim()) {
            const handleSearch = async () => {
                try {
                    const response = await fetch(`/api/search?q=${debouncedSearchTerm}`);
                    const data = await response.json();
                    setResults(data); 
                } catch (error) {
                    console.error("검색 실패:", error);
                }
            };

            handleSearch();  
        }
    }, [debouncedSearchTerm]); 

    return (
        <>
        <SearchContainer>
            <SearchBarWrapper>
                <SearchInput
                    type="text"
                    placeholder="종목을 검색해보세요"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)} 
                />
                <SearchButton as="button" onClick={() => setDebouncedSearchTerm(searchTerm)}>
                    <Search size={22} color="var(--primary-color)" />
                </SearchButton>
            </SearchBarWrapper>
            
            {/* 검색 결과를 보여주는 부분 */}
            <SearchContentWrapper>
                {results?.map(({ stockCode, stockImage, stockId, stockName }) => (
                    <StockLink href={`/stock/${stockCode}`} key={stockId}>
                        <LogoWrapper>
                            {stockImage ? (
                                <StockImage
                                    src={`/stock/${stockImage}.png`}
                                    alt={stockName}
                                    width={40}
                                    height={40}
                                />
                            ) : (
                                <StockImage
                                    src={`/stock/DEFAULT.png`}
                                    alt="stockDefault"
                                    width={40}
                                    height={40}
                                />
                            )}
                        </LogoWrapper>
                        <StockName>
                            <HighlightText text={stockName} query={searchTerm} />
                        </StockName>
                    </StockLink>
                ))}
            </SearchContentWrapper>
        </SearchContainer>
        </>
    );
};

export default SearchClient;
