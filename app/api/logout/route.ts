import { NextResponse } from "next/server";
import { serialize } from "cookie";

export async function POST() {
  // accessToken 쿠키 삭제
  const removeAccessToken = serialize("accessToken", "", {
    httpOnly: true,
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  });

  // refreshToken 쿠키 삭제
  const removeRefreshToken = serialize("refreshToken", "", {
    httpOnly: true,
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  });

  // 헤더에 두 쿠키를 각각 추가
  const headers = new Headers();
  headers.append("Set-Cookie", removeAccessToken);
  headers.append("Set-Cookie", removeRefreshToken);
  headers.set("Content-Type", "application/json");

  return new NextResponse(
    JSON.stringify({ message: "Logged out successfully" }),
    {
      status: 200,
      headers,
    }
  );
}
