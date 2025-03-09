import { NextResponse, NextRequest } from "next/server";
import { RefreshAccessTokenUseCase } from "@/application/usecases/user/RefreshAccessTokenUseCase";
import { UserRepository } from "@/infrastructure/repositories/PgUserRepository";

export async function middleware(req: NextRequest) {
  // 보호할 경로 설정
  const protectedPaths = ["/user"];
  if (!protectedPaths.some((path) => req.nextUrl.pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // 쿠키에서 accessToken과 refreshToken 가져오기
  const accessToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;

  if (accessToken) {
    // accessToken이 있으면 검증 없이 그대로 진행
    return NextResponse.next();
  }

  if (!refreshToken) {
    // refreshToken도 없으면 로그인 페이지로 이동
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // refreshToken을 이용해 accessToken 재발급 시도
  const userRepository = new UserRepository();
  const refreshAccessTokenUseCase = new RefreshAccessTokenUseCase(
    userRepository
  );

  try {
    console.log("Access Token이 없으므로 Refresh Token을 이용해 재발급 시도");
    const refreshResult = await refreshAccessTokenUseCase.execute(refreshToken);
    console.log("리프레쉬 결과 : ", refreshResult);

    // 새 accessToken을 쿠키에 저장 후 요청 진행
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

// 미들웨어 적용 범위 지정
export const config = {
  matcher: ["/user/:path*"],
};
