import Image from "next/image";
import { SearchBar } from "@/app/components/search/SearchBar";
import { Container, TopSection, ImageWrapper, InvestmentSection, InvestmentHeader, TitleBox, } from "@/app/components/home/Home.Styled";
import StockList from "@/app/components/home/StockList";
import StockCategory from "@/app/components/home/StockCategory";
import HomeQuiz from "@/app/components/home/HomeQuiz";
import { StockListResponseDto } from "@/application/usecases/home/dtos/StockListResponseDto";

export default function Home({ path, initialData }: {path:string, initialData: StockListResponseDto[]}) {
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
        <TitleBox>인기종목</TitleBox>
        <StockList path={path} initialData={initialData}/> {/*인기종목 리스트*/}
        <TitleBox>카테고리로 보기</TitleBox>
        <StockCategory /> {/* 카테고리 리스트*/}
      </InvestmentSection>
    </Container>
  );
}
