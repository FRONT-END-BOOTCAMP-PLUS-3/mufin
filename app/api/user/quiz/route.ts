import { NextRequest, NextResponse } from "next/server";
import { quizDi } from "@/infrastructure/config/quizDi";
import { ResponseQuizDto } from "@/application/usecases/quiz/dtos/ResponseQuizDto";
import { getDecodedUserId } from "@/utils/getDecodedUserId";



// HTTP Method GET : 퀴즈 문제 받아오기
export async function GET(req: NextRequest) {
  try {

    // 사용자가 요청하는 개수 default: 5
    const { searchParams } = new URL(req.url);
    
    const limitParam = searchParams.get("limit");
    const limit = limitParam ? parseInt(limitParam, 10) : 5;

    // 쿠키의 있는 userId 가져오기
    const userId: string | null = await getDecodedUserId();

    if (!userId) {
      return NextResponse.json({ error: "User ID not found in cookies" }, { status: 400 });
    }

    const responseQuizDtos: {totalQuestions: number; questions:ResponseQuizDto[]} 
      = await quizDi.getRandomQuestionUseCase.execute(userId, limit);

    return NextResponse.json( {quiz:responseQuizDtos} , { status: 200 });

  } catch (error) {
    console.error("GET /api/quiz error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },{ status: 500 }
    );
  }
}

// 퀴즈 정답 record DB에 추가하기
export async function POST(req: NextRequest) {
  try {
    
    const userId = await getDecodedUserId();

    // userId 유효성 검사
    if (!userId) {
      return NextResponse.json({ error: "User ID not found in cookies" }, { status: 400 });
    }

    const body = await req.json();
    const { questionId, reword } = body;

    // questionId 유효성 검사
    if (!questionId) {
      return NextResponse.json({ error: "Missing questionId" }, { status: 400 });
    }

    if(!reword){
      return NextResponse.json({ error: "Missing reword" }, { status: 400 });
    }

    // Submit question Answer UseCase 동작
    await quizDi.submitQuizAnswerUseCase.execute(userId, questionId, reword);

    return NextResponse.json({status:200});
    // 에러 시 동작 에러코드 반환
  } catch (error) {
    console.error("POST /api/quiz error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
