import StockList from "@/app/te/components/Te";
import { CategoryContainer } from "@/app/(anon)/category/components/Category.Styled";
interface CategoryProps {
  searchParams: { c?: string };
}

const Category = async({ searchParams }: CategoryProps) => {
  const resolvedSearchParams = await Promise.resolve(searchParams);
  const { c } = resolvedSearchParams;
  const category = c || "1";
  const path = `/api/category?c=${category}`;
  console.log("category=",category);

  return (
    <CategoryContainer>
      <StockList path={path} />
    </CategoryContainer>
  );
};

export default Category;
