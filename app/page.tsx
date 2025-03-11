import Image from "next/image";
import { SearchBar } from "@/app/components/search/SearchBar";
import {
  Container,
  TopSection,
  ImageWrapper,
  InvestmentSection,
  InvestmentHeader,
} from "@/app/components/home/Home.Styled";

import StockList from "@/app/components/home/StockList";
import StockCategory from "@/app/components/home/StockCategory";
import HomeQuiz from "@/app/components/home/HomeQuiz";

export default function Home() {
  const path = `/api/home`

  return (
    <Container>
      <TopSection>
        <ImageWrapper>
          <Image
            src="/character.svg"
            alt="character"
            width={135}
            height={152}
            priority
          />
        </ImageWrapper>
        <HomeQuiz />
      </TopSection>
      <InvestmentSection>
        <InvestmentHeader>
          <h2>모의 투자</h2>
          <p>모의투자로 투자 감각을 키워보세요</p>
        </InvestmentHeader>
        <SearchBar />
        <StockList path={path} /> {/*인기종목 리스트*/}
        <StockCategory /> {/* 카테고리 리스트*/}
      </InvestmentSection>
    </Container>
  );
}
