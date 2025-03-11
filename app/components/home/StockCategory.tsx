"use client";

import Image from "next/image";
import {
    Container,
    TitleBox,
    Grid,
    CategoryCard,
    CategoryName,
    CategoryWrapper,
} from "@/app/components/home/StockCategory.Styled";

const categories = [
    { id: 1,   name: "스마트폰", image: "/stock-category/smartphone.png",  color: "#FFB5FA"},
    { id: 2,  name: "자동차", image: "/stock-category/automobile.png", color: "#B1B8FF" },
    { id: 3,  name: "식품", image: "/stock-category/food.png",  color: "#FFD6A8" },
    { id: 4,  name: "엔터테인먼트", image: "/stock-category/entertainment.png",color: "#A5EAFF"},
    { id: 5,  name: "제약", image: "/stock-category/pharmaceutical.png",  color: "#B4FFBC" },
    { id: 6,  name: "반도체", image: "/stock-category/semiconductor.png",  color: "#FF8D8D" },
]

const StockCategory = () => {
    return (
        <Container>
            <TitleBox>카테고리로 보기</TitleBox>
            <Grid>
                {categories.map((category) => (
                  <CategoryWrapper key={category.name}>
                      <CategoryName>{category.name}</CategoryName>
                      <CategoryCard 
                      color={category.color} 
                      href={{ pathname: "/category", query: { c: category.id } }}
                  >
                              <Image src={category.image} alt={category.name} width={80} height={80} />
                      </CategoryCard>
                  </CategoryWrapper>
                ))}
            </Grid>
        </Container>
    );
};

export default StockCategory;
