import React from "react";
import { Search } from "lucide-react";
import { Message, NoResultsContainer } from "@/app/(anon)/search/components/Search.Styled";

const NoResults = () => {
    return (
        <NoResultsContainer>
            <Search size={48} color="var(--primary-500)" />
            <Message>검색 결과가 없습니다</Message>
        </NoResultsContainer>
    );
};

export default NoResults;
