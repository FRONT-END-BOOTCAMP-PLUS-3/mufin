import { NextResponse } from 'next/server';
import { PrStockRepository } from '@/infrastructure/repositories/PrStockRepository';
import { StockInfoUseCase } from '@/application/usecases/stock/StockInfoUseCase';


// StockRepository와 StockUsecase 인스턴스 생성
const stockRepository = new PrStockRepository();
const stockUsecase = new StockInfoUseCase(stockRepository);

export async function GET(req: Request, { params }: { params: { symbol: string } }) {
  const { symbol } = await params;

  try {
    const stockData = await stockUsecase.getStockInfoByCode(symbol);

    if (!stockData) {
      return NextResponse.json({ error: '주식 정보를 찾을 수 없습니다.' }, { status: 404 });
    }

    const responseData = {
      ...stockData,
      totalShare: stockData.totalShare.toString(),  // BigInt를 문자열로 변환
    };

    return NextResponse.json(responseData);
  } catch (error) {
    console.error('Error fetching stock data:', error);
    return NextResponse.json({ error: '주식 데이터를 불러오는 데 실패했습니다.' }, { status: 500 });
  }
}
