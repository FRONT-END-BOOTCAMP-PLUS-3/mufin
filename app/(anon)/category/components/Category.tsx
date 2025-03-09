import StockList from "@/app/te/components/Te";
import { CategoryContainer } from "@/app/(anon)/category/components/Category.Styled";
import { useSearchParams } from "next/navigation";

const Category = () => {

    const searchParams = useSearchParams();
    const category = searchParams.get("c");

    const path = `/api/category?c=${category}`;

  return (
    <>
      <CategoryContainer>
        <StockList path={path}/>
      </CategoryContainer>
    </>
  );
};
export default Category;
