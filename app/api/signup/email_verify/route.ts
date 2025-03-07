import { NextResponse } from "next/server";
import { VerifyEmailAuthCodeUseCase } from "@/application/usecases/user/VerifyEmailAuthUseCase";

export async function POST(req: Request) {
  try {
    const { email, authCode } = await req.json();

    const verifyEmailAuthCodeUseCase = new VerifyEmailAuthCodeUseCase();
    await verifyEmailAuthCodeUseCase.execute(email, authCode);

    return NextResponse.json(
      { message: "이메일 인증이 완료되었습니다." },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("이메일 인증 오류:", error);
    const errorMessage =
      error instanceof Error ? error.message : "서버 오류 발생";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
