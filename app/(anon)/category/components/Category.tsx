
import { CategoryContainer } from "@/app/(anon)/category/components/Category.Styled";
import StockList from "@/app/components/home/StockList";
import { StockListResponseDto } from "@/application/usecases/home/dtos/StockListResponseDto";

interface CategoryProps {
  path: string; // 부모에서 이미 문자열로 확정해서 넘겨줌
  initialData:StockListResponseDto[];
}
export default async function Category({ path, initialData }: CategoryProps) {


  return (
    <CategoryContainer>
      <StockList path={path} initialData={initialData}/>
    </CategoryContainer>
  );  
}
