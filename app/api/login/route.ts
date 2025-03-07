import { NextResponse } from "next/server";
import { serialize } from "cookie";
import { UserRepository } from "@/infrastructure/repositories/PgUserRepository";
import { LoginUseCase } from "@/application/usecases/user/LoginUseCase";

export async function POST(req: Request) {
  try {
    const { loginId, password } = await req.json();
    const userRepository = new UserRepository();
    const loginUseCase = new LoginUseCase(userRepository);

    // 로그인 Use Case 실행
    const { accessToken, refreshToken } = await loginUseCase.execute({
      loginId,
      password,
    });

    // 쿠키 생성 (access token, refresh token)
    const accessTokenCookie = serialize("accessToken", accessToken, {
      httpOnly: true,
      maxAge: 60 * 60, // 1시간
      sameSite: "strict",
      path: "/",
    });

    const refreshTokenCookie = serialize("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60, // 7일
      sameSite: "strict",
      path: "/",
    });

    return new NextResponse(JSON.stringify({ message: "Logged in" }), {
      status: 200,
      headers: {
        "Set-Cookie": `${accessTokenCookie}, ${refreshTokenCookie}`,
        "Content-Type": "application/json",
      },
    });
  } catch (error: any) {
    console.error("Login error:", error);
    return new NextResponse(
      JSON.stringify({ message: error.message || "Server error" }),
      {
        status: 500,
      }
    );
  }
}
