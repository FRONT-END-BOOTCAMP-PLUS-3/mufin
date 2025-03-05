import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { GetUserInfoUseCase } from "@/application/usecases/user/GetUserInfoUseCase";
import { UserRepository } from "@/infrastructure/repositories/PgUserRepository";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    const refreshToken = cookieStore.get("refreshToken")?.value;

    const userRepository = new UserRepository();
    const getMyInfoUseCase = new GetUserInfoUseCase(userRepository);

    const result = await getMyInfoUseCase.execute(token, refreshToken);

    const headers = new Headers({ "Content-Type": "application/json" });
    if (result.newTokenCookie) {
      headers.append("Set-Cookie", result.newTokenCookie);
    }

    return new NextResponse(JSON.stringify(result.user), {
      status: 200,
      headers,
    });
  } catch (error: any) {
    console.error("User fetch error:", error);
    return new NextResponse(
      JSON.stringify({ message: error.message || "Server error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
