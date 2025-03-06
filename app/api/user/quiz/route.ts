import { ResponseQuizDto } from "@/application/usecases/quiz/dtos/ResponseQuizDto";
import { GetRandomQuestionUseCase } from "@/application/usecases/quiz/GetQuestionUseCase";
import { IGetRandomQuestionUseCase } from "@/application/usecases/quiz/interfaces/IGetRandomQuestionUseCase";
import { ISubmitQuizAnswerUseCase } from "@/application/usecases/quiz/interfaces/ISubmitQuizAnswerUseCase";
import { SubmitQuizAnswerUseCase } from "@/application/usecases/quiz/SubmitQuizAnswerUseCase";
import { IChoiceRepository } from "@/domain/repositories/IChoiceRepository";
import { IQuestionRepository } from "@/domain/repositories/IQuestionRepository";
import { IRecordRepository } from "@/domain/repositories/IRecordRepository";
import { IWalletRepository } from "@/domain/repositories/IWalletRepository";
import { PgChoiceRepository } from "@/infrastructure/repositories/PgChoiceRepository";
import { PgQuestionRepository } from "@/infrastructure/repositories/PgQuestionRepositroy";
import { PgRecordRepository } from "@/infrastructure/repositories/PgRecordRepository";
import { PgWalletRepository } from "@/infrastructure/repositories/PgWalletRepository";
import { NextRequest, NextResponse } from "next/server";
import { getDecodedUserId } from "@/utils/getDecodedUserId";

// HTTP Method GET : 퀴즈 문제 받아오기
export async function GET(req: NextRequest) {
  try {

    // 사용자가 요청하는 개수 default: 5
    const { searchParams } = new URL(req.url);
    const userId = await getDecodedUserId();
    const limitParam = searchParams.get("limit");
    const limit = limitParam ? parseInt(limitParam, 10) : 5;

    if (!userId) {
      return NextResponse.json({ error: "User ID not found in cookies" }, { status: 400 });
    }
    

    // repository 인스턴스 생성
    const questionRepository: IQuestionRepository = new PgQuestionRepository();
    const recordRepository: IRecordRepository = new PgRecordRepository();
    const choiceRepository: IChoiceRepository = new PgChoiceRepository();


    const getRandomQuestionUseCase: IGetRandomQuestionUseCase =
      new GetRandomQuestionUseCase(questionRepository, recordRepository, choiceRepository);

    const responseQuizDtos: {totalQuestions: number; questions:ResponseQuizDto[]} 
      = await getRandomQuestionUseCase.execute(userId, limit);

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

    // Repository 인스턴스 생성
    const recordRepository: IRecordRepository = new PgRecordRepository();
    const walletRepository: IWalletRepository = new PgWalletRepository();

    // Repository 의존성주입
    const submitQuizAnswerUseCase: ISubmitQuizAnswerUseCase = new SubmitQuizAnswerUseCase(recordRepository, walletRepository);

    // Submit question Answer UseCase 동작
    await submitQuizAnswerUseCase.execute(userId, questionId, reword);



    return NextResponse.json({status:200});
    // 에러 시 동작 에러코드 반환
  } catch (error) {
    console.error("POST /api/quiz error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
