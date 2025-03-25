import { NextResponse, NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const accessToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;

  // 로그인/회원가입 페이지에 접근할 때, 토큰이 있다면 홈으로 리다이렉트
  if (pathname.startsWith("/login") || pathname.startsWith("/signup")) {
    if (accessToken || refreshToken) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    return NextResponse.next();
  }

  // 보호된 경로 (/user) 접근 시 처리
  if (pathname.startsWith("/user")) {
    // accessToken이 있으면 그대로 진행
    if (accessToken) return NextResponse.next();

    // refreshToken이 없다면 로그인 페이지로 리다이렉트
    if (!refreshToken) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    try {
      // refresh token은 이미 쿠키에 있으므로 별도 헤더나 바디 없이 API 호출
      const refreshAccessToken = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/refresh-token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken }),
      }); 

      if (!refreshAccessToken.ok) {
        return NextResponse.redirect(new URL("/login", req.url));
      }

      const { newToken: newAccessToken } = await refreshAccessToken.json();

      // 새 accessToken을 httpOnly 쿠키에 저장
      const response = NextResponse.next();
      response.cookies.set("accessToken", newAccessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        path: "/",
        maxAge: 3600, // 1시간
      });

      response.cookies.set("refreshToken", newAccessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        path: "/",
        maxAge: 7 * 24 * 60 * 60,
      });

      return response;
    } catch (error) {
      console.error("🚨 API 호출 중 오류 발생:", error);
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/user/:path*", "/login", "/signup"],
};
