"use client";

import Link from "next/link";
import Image from "next/image";
import {
    Container,
    TitleBox,
    Grid,
    CategoryCard,
    ImageWrapper,
    CategoryName,
    CategoryWrapper,
} from "@/app/components/home/StockCategory.Styled";

const categories = [
  {
    name: "자동차",
    image: "/stock-category/automobile.png",
    path: "/stocks/automobile",
    color: "#B1B8FF",
  },
  {
    name: "스마트폰",
    image: "/stock-category/smartphone.png",
    path: "/stocks/smartphone",
    color: "#FFB5FA",
  },
  {
    name: "식품",
    image: "/stock-category/food.png",
    path: "/stocks/food",
    color: "#FFD6A8",
  },
  {
    name: "화학",
    image: "/stock-category/chemistry.png",
    path: "/stocks/chemistry",
    color: "#A5EAFF",
  },
  {
    name: "제약",
    image: "/stock-category/pharmaceutical.png",
    path: "/stocks/pharmaceutical",
    color: "#B4FFBC",
  },
  {
    name: "반도체",
    image: "/stock-category/semiconductor.png",
    path: "/stocks/semiconductor",
    color: "#FF8D8D",
  },
];

const StockCategory = () => {
  return (
    <Container>
      <TitleBox>카테고리로 보기</TitleBox>
      <Grid>
        {categories.map((category) => (
          <Link key={category.name} href={category.path} passHref>
            <CategoryWrapper>
              <CategoryName>{category.name}</CategoryName>
              <CategoryCard color={category.color}>
                <ImageWrapper>
                  <Image
                    src={category.image}
                    alt={category.name}
                    width={80}
                    height={80}
                  />
                </ImageWrapper>
              </CategoryCard>
            </CategoryWrapper>
          </Link>
        ))}
      </Grid>
    </Container>
  );
};

export default StockCategory;
