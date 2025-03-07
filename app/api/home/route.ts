import { CurrentPriceResponseDto } from "@/application/usecases/kis/dtos/CurrentPriceResponseDto";
import { GetCurrentPriceUseCase } from "@/application/usecases/kis/GetCurrentPriceUseCase";
import { IGetCurrentPriceUseCase } from "@/application/usecases/kis/interfaces/IGetCurrentPriceUseCase";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const requestParam = searchParams.get("stockList");

    const requests = requestParam ? requestParam.split(",") : [];

    const getCurrentPriceUseCase: IGetCurrentPriceUseCase =
      new GetCurrentPriceUseCase();

    const currentResponseDtos: CurrentPriceResponseDto[] =
      await getCurrentPriceUseCase.executeGroup(requests);

    if(currentResponseDtos.length === 0) {
        return NextResponse.json({error: "요청 데이터의 정보가 없습니다."},{status: 500});
    }
      
      return NextResponse.json(currentResponseDtos, { status: 200 });
  } catch (error) {
    console.error("Current API REST API ERROR:", error);
    return NextResponse.json({ error: "Internal Server Error" },{ status: 500 });
  }
}
