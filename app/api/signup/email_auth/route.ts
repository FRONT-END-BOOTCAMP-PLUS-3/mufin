import { NextResponse } from "next/server";
import { SendEmailAuthCodeUseCase } from "@/application/usecases/user/SendEmailAuthUseCase";
import { UserRepository } from "@/infrastructure/repositories/PgUserRepository";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    // UserRepository는 인프라 계층에 구현된 저장소
    const userRepository = new UserRepository();
    const sendEmailAuthCodeUseCase = new SendEmailAuthCodeUseCase(
      userRepository
    );

    await sendEmailAuthCodeUseCase.execute(email);

    return NextResponse.json(
      { message: "인증번호가 이메일로 전송되었습니다." },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("이메일 인증번호 전송 오류:", error);
    const errorMessage =
      error instanceof Error ? error.message : "이메일 전송 중 오류 발생";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
