"use client";

import Image from "next/image";
import {
    Container,
    CategoryCard,
    CategoryName,
    CategoryWrapper,
} from "@/app/components/home/StockCategory.Styled";

const categories = [
    { id: 1,   name: "스마트폰", image: "/stock-category/smartphone.png",  color: "#FFD6A8"},
    { id: 2,  name: "자동차", image: "/stock-category/automobile.png", color: "#B1B8FF" },
    { id: 3,  name: "식품", image: "/stock-category/food.png",  color: "#A5EAFF" },
    { id: 4,  name: "화학", image: "/stock-category/chemistry.png",color: "#FF8D8D"},
    { id: 5,  name: "제약", image: "/stock-category/pharmaceutical.png",  color: "#B4FFBC" },
    { id: 6,  name: "반도체", image: "/stock-category/semiconductor.png",  color: "#FFB5FA" },
]

const StockCategory = () => {
    return (
        <Container>
                {categories.map((category) => (
                  <CategoryWrapper key={category.name}>
                      <CategoryCard 
                      color={category.color} 
                      href={{ pathname: "/category", query: { c: category.id } }}
                  >
                              <Image src={category.image} alt={category.name} width={80} height={80} />
                      </CategoryCard>
                      <CategoryName>{category.name}</CategoryName>
                  </CategoryWrapper>
                ))}
        </Container>
    );
};

export default StockCategory;
