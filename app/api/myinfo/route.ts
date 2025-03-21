import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { GetUserInfoUseCase } from "@/application/usecases/user/GetUserInfoUseCase";
import { UserRepository } from "@/infrastructure/repositories/PgUserRepository";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
    const refreshToken = cookieStore.get("refreshToken")?.value;

    const userRepository = new UserRepository();
    const getUserInfoUseCase = new GetUserInfoUseCase(userRepository);

    const result = await getUserInfoUseCase.execute(accessToken, refreshToken);

    const headers = new Headers({ "Content-Type": "application/json" });
    if (result.newTokenCookie) {
      headers.append("Set-Cookie", result.newTokenCookie);
    }

    return new NextResponse(JSON.stringify(result.user), {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error("User fetch error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Server error";
    return new NextResponse(JSON.stringify({ message: errorMessage }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
