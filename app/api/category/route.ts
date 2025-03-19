import { NextRequest, NextResponse } from "next/server";

import { IGetCurrentPriceUseCase } from '@/application/usecases/kis/interfaces/IGetCurrentPriceUseCase';
import { IStockByCategoryUseCase } from "@/application/usecases/stock/interfaces/IStcokByCategoryUseCase";
import { StockByCategoryUseCase } from "@/application/usecases/stock/StockByCategoryUseCase";

import { PgStockRepository } from "@/infrastructure/repositories/PgStockRepository";
import { IStockRepository } from "@/domain/repositories/IStockRepository";

import { kisAPIDi } from '@/infrastructure/config/kisApiDi';

export async function GET(req: NextRequest) {

    try{
    
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("c")  || "1";

    if (!category) {
        return NextResponse.json({error:"Invalid category"}, { status: 400 });
      }

      const stockRepository: IStockRepository = new PgStockRepository();
      const getCurrentPriceUseCase: IGetCurrentPriceUseCase = kisAPIDi.getCurrentPriceUseCase;
      const stockByCategoryUseCase: IStockByCategoryUseCase = new StockByCategoryUseCase(
        stockRepository,
        getCurrentPriceUseCase
      );
      
      const stocks = await stockByCategoryUseCase.execute(category);

      if(stocks.length === 0 ) {
        return NextResponse.json({error: "주식 데이터가 없습니다"}, {status: 500});
      } 

     return NextResponse.json(stocks, {status: 200});
    }catch (error) {
        console.error("Current API REST API ERROR:", error);
        return NextResponse.json(
          { error: "Internal Server Error" },
          { status: 500 }
        );
      }


}