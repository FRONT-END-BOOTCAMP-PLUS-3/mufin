import Category from "@/app/(anon)/category/components/Category";
import { fetchStockList } from "@/utils/fetchStock";

export interface CategoryPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  }
  

  export default async function CategoryPage({ searchParams }: CategoryPageProps) {
    const query = (searchParams ? await  searchParams : {}) as{
      c?: string | string[];
};
    let categoryId= "1";

    if (Array.isArray(query.c)) {
      categoryId = query.c[0] ?? "1";
    } else if (typeof query.c === "string") {
      categoryId = query.c;
    }
  const path = `/api/category?c=${categoryId}`;
  const initialData = await fetchStockList(path);


    return (
        
      // Category 컴포넌트로 searchParams 전달
      // searchParams가 없을 수도 있으니 ?? {} 로 안전 처리
      <Category path={path} initialData={initialData}/>
    );
  }