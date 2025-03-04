"use client";
import Image from "next/image";
import { SearchBar } from "@/app/components/search/SearchBar";
import {
    Container,
    TopSection,
    ImageWrapper,
    IntroBox,
    QuizButton,
    InvestmentSection,
    InvestmentHeader,
} from "@/app/components/home/Home.Styled"; // ✅ 스타일 파일에서 가져오기
import StockList from "@/app/components/home/StockList";
import StockCategory from "./components/home/StockCategory";

export default function Home() {
    return (
        <Container>
            <TopSection>
                <ImageWrapper>
                    <Image src="/character.svg" alt="character" width={135} height={100} />
                </ImageWrapper>
                <IntroBox>
                    <p>금융 퀴즈를 풀고 포인트를 쌓아 실전처럼 투자해보세요!</p>
                    <QuizButton href="/quiz">
                        오늘의 퀴즈 풀기
                        <Image src="/arrow_right.svg" alt="arrow_right" width={12} height={20} />
                    </QuizButton>
                </IntroBox>
            </TopSection>
            <InvestmentSection>
                <InvestmentHeader>
                    <h2>모의 투자</h2>
                    <p>모의투자로 투자 감각을 키워보세요</p>
                </InvestmentHeader>
                <SearchBar />
                <StockList /> {/*인기종목 리스트*/}
                <StockCategory /> {/*인기종목 리스트*/}
            </InvestmentSection>
        </Container>
    );
}
