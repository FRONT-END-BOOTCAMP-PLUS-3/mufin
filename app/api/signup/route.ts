import { NextResponse } from "next/server";
import { UserRepository } from "@/infrastructure/repositories/PgUserRepository";
import { SignUpUseCase } from "@/application/usecases/user/SignUpUseCase";

export async function POST(req: Request) {
  try {
    const { name, loginId, password, email } = await req.json();
    const userRepository = new UserRepository();
    const signupUseCase = new SignUpUseCase(userRepository);

    const { message, user } = await signupUseCase.execute({
      name,
      loginId,
      email,
      password,
    });

    return new NextResponse(JSON.stringify({ message, user }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("Signup error:", error);
    return new NextResponse(
      JSON.stringify({ error: error.message || "회원가입 중 오류 발생" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
