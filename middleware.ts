import { NextResponse, NextRequest } from "next/server";
import { RefreshAccessTokenUseCase } from "@/application/usecases/user/RefreshAccessTokenUseCase";
import { UserRepository } from "@/infrastructure/repositories/PgUserRepository";

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

    // refreshToken이 있을 경우 accessToken 재발급 시도
    const userRepository = new UserRepository();
    const refreshAccessTokenUseCase = new RefreshAccessTokenUseCase(
      userRepository
    );
    try {
      console.log("Refresh Token을 이용해 재발급 시도");
      const refreshResult = await refreshAccessTokenUseCase.execute(
        refreshToken
      );
      console.log("리프레쉬 결과 : ", refreshResult);

      const response = NextResponse.next();
      response.cookies.set("accessToken", refreshResult.accessToken, {
        httpOnly: true,
        sameSite: "strict",
        path: "/",
        maxAge: 3600,
      });
      console.log("새로운 Access Token 발급 완료");
      return response;
    } catch (refreshError) {
      console.error("Refresh Token 검증 실패:", refreshError);
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

// 미들웨어 적용 범위 지정
export const config = {
  matcher: ["/user/:path*", "/login", "/signup"],
};
