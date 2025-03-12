import { NextResponse } from 'next/server';
import { PgStockRepository } from '@/infrastructure/repositories/PgStockRepository';
import { SearchUseCase } from '@/application/usecases/search/SearchUseCase';

const stockRepository = new PgStockRepository();
const searchUsecase = new SearchUseCase(stockRepository);

export async function GET(req: Request) {
  const queryParams = new URL(req.url).searchParams;
  const searchQuery = queryParams.get('q') || '';

  try {
    const stockData = await searchUsecase.getStockInfoByName(searchQuery);

    if (!stockData) {
      return NextResponse.json({ error: '검색 결과가 없습니다.' }, { status: 404 });
    }

    return NextResponse.json(stockData);
  } catch (error) {
    console.error('Error searching stock:', error);
    return NextResponse.json({ error: '검색에 실패했습니다.' }, { status: 500 });
  }
}
