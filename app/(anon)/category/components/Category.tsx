import StockList from "@/app/te/components/Te";
import { CategoryContainer } from "@/app/(anon)/category/components/Category.Styled";
// import { CategoryPageProps } from "@/app/(anon)/category/page";

interface CategoryProps {
  categoryId: string; // 부모에서 이미 문자열로 확정해서 넘겨줌
}
export default async function Category({ categoryId }: CategoryProps) {
  
  const path = `/api/category?c=${categoryId}`;

  return (
    <CategoryContainer>
      <StockList path={path} />
    </CategoryContainer>
  );  
}
