import { NextResponse, NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const accessToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;

  // 로그인/회원가입에서 토큰이 있다면 홈으로 리다이렉트
  if (pathname.startsWith("/login") || pathname.startsWith("/signup")) {
    if (accessToken || refreshToken) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    return NextResponse.next();
  }

  // 보호된 경로 접근 시
  if (pathname.startsWith("/user")) {
    if (accessToken) {
      return NextResponse.next();
    }

    if (!refreshToken) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // ✅ API Route를 호출하여 Access Token 갱신
    try {
      console.log("🔄 Refresh Token을 이용해 재발급 시도");

      const refreshResponse = await fetch(new URL("/api/refresh-token", req.url), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      });

      if (!refreshResponse.ok) {
        console.error("❌ Refresh Token 검증 실패");
        return NextResponse.redirect(new URL("/login", req.url));
      }

      const { accessToken: newAccessToken } = await refreshResponse.json();
      console.log("✅ 새로운 Access Token 발급 완료");

      const response = NextResponse.next();
      response.cookies.set("accessToken", newAccessToken, {
        httpOnly: true,
        sameSite: "strict",
        path: "/",
        maxAge: 3600,
      });

      return response;
    } catch (error) {
      console.error("🚨 API 호출 중 오류 발생:", error);
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

// ✅ 미들웨어는 Edge에서 실행되도록 설정
export const config = {
  matcher: ["/user/:path*", "/login", "/signup"],
};
