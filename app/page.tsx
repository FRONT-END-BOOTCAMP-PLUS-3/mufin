import Home from "@/app/components/home/Home";
import { StockListResponseDto } from "@/application/usecases/home/dtos/StockListResponseDto";
import { fetchStockList } from "@/utils/fetchStock";

const HomePage = async({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined }; }) => {
  const path =
  typeof searchParams.path === 'string'
    ? searchParams.path : '/api';
  const initialData: StockListResponseDto[] = await fetchStockList(path);

  return (
    <>
      <Home path={path} initialData={initialData}/>
    </>
  );
}
export default HomePage;