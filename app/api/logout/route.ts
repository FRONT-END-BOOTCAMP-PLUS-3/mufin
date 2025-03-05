// src/presentation/api/logout/route.ts
import { NextResponse } from "next/server";
import { LogoutUseCase } from "@/application/usecases/user/LogoutUseCase";

export async function POST() {
  const logoutUseCase = new LogoutUseCase();
  const { removeAccessToken, removeRefreshToken } = logoutUseCase.execute();

  const headers = new Headers();
  headers.append("Set-Cookie", `${removeAccessToken}, ${removeRefreshToken}`);
  headers.set("Content-Type", "application/json");

  return new NextResponse(
    JSON.stringify({ message: "Logged out successfully" }),
    {
      status: 200,
      headers,
    }
  );
}
