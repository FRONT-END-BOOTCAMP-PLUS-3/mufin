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
    { id: 1,   name: "스마트폰", image: "/stock-category/smartphone.svg", path: "/stocks/smartphone", color: "#FFB5FA"},
    { id: 2,  name: "자동차", image: "/stock-category/automobile.svg", path: "/stocks/automobile", color: "#B1B8FF" },
    { id: 3,  name: "식품", image: "/stock-category/food.svg", path: "/stocks/food", color: "#FFD6A8" },
    { id: 4,  name: "엔터테인먼트", image: "/stock-category/entertainment.svg",path: "/stocks/entertainment",color: "#A5EAFF"},
    { id: 5,  name: "제약", image: "/stock-category/pharmaceutical.svg", path: "/stocks/pharmaceutical", color: "#B4FFBC" },
    { id: 6,  name: "반도체", image: "/stock-category/semiconductor.svg", path: "/stocks/semiconductor", color: "#FF8D8D" },
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
                            passHref
                        >
                                    <Image src={category.image} alt={category.name} width={80} height={20} />
                            </CategoryCard>
                        </CategoryWrapper>
                ))}
            </Grid>
        </Container>
    );
};

export default StockCategory;
