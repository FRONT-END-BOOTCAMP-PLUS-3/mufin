import { CheckTodayAttemptUseCase } from '@/application/usecases/attempt/CheckTodayAttemptUseCase';
import { ICheckTodayAttemptUseCase } from '@/application/usecases/attempt/interfaces/ICheckTodayAttmptUseCase';
import { getDecodedUserId } from "@/utils/getDecodedUserId";
import { ISaveAttemptUseCase } from "@/application/usecases/attempt/interfaces/ISaveAttemptUseCase";
import { SaveAttemptUseCase } from "@/application/usecases/attempt/SaveAttemptUseCase";
import { IAttemptRepository } from "@/domain/repositories/IAttemptRepository";
import { PgAttemptRepository } from "@/infrastructure/repositories/PgAttempRepository";
import { NextResponse } from "next/server";

// 일단 메인페이지랑 퀴즈 결과페이지에서 호출되어야할 로직들인데 페이지 pull 받고 업데이트해놓을게요.
export async function POST(req: NextResponse) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json({ error: "Authorization header not found" }, { status: 401 });
    }
    const userId = getDecodedUserId(authHeader);
    
    
    // const userId = "b1bc9ef8-4582-47ea-b538-ab2b827f7663";

    if (!userId) {
        return NextResponse.json({ error: "Invalid token" }, { status: 401 });
      }

      // repository 인스턴스 생성
      const attemptRepository : IAttemptRepository = new PgAttemptRepository();
      
      // repository 의존성 주입
      const saveAttemptUseCase : ISaveAttemptUseCase = new SaveAttemptUseCase(attemptRepository);

      // use case 실행
      await saveAttemptUseCase.execute(userId);

      return NextResponse.json({ message: "Save Attempt Success" }, { status: 200 });

  } catch (error) {
    return new NextResponse(JSON.stringify({ error: error }), { status: 500 });
  };
};

export async function GET (req:NextResponse) {
  try{
   const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json({ error: "Authorization header not found" }, { status: 401 });
    }
    const userId = getDecodedUserId(authHeader);

    // const userId = "b1bc9ef8-4582-47ea-b538-ab2b827f7663";
    if (!userId) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    // repository 인스턴스 생성
    const attemptRepository : IAttemptRepository = new PgAttemptRepository();

    // repository 의존성 주입
    const checkTodayAttemptUseCase : ICheckTodayAttemptUseCase = new CheckTodayAttemptUseCase(attemptRepository);

    // use case 실행
    const isTodayAttempt = await checkTodayAttemptUseCase.execute(userId);

    return NextResponse.json({ isTodayAttempt }, { status: 200 });
  }
  catch (error) {
    console.error(error);
    return NextResponse.json({ error: "서버의 일시적인 오류가 발생했습니다." },{ status: 500 });
  }
};