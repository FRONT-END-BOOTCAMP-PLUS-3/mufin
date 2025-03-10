import jwt from "jsonwebtoken";
import { RefreshAccessTokenUseCase } from "@/application/usecases/user/RefreshAccessTokenUseCase";
import { env } from "@/config/env";
import { UserRepository } from "@/infrastructure/repositories/PgUserRepository";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  // 2. refreshToken 쿠키 추출
  try {
    const refreshToken = (await cookies()).get("refreshToken")?.value;
    if (!refreshToken) {
      return NextResponse.json(
        { success: false, message: "Refresh token not found in cookies" },
        { status: 400 }
      );
    }

    const decoded = jwt.verify(refreshToken, env.JWT_SECRET as string) as {
      userId: string;
    };

    if (!decoded?.userId) {
      return NextResponse.json(
        { success: false, message: "Invalid refresh token" },
        { status: 401 }
      );
    }

    const userRepository = new UserRepository();
    const refreshAccessTokenUseCase = new RefreshAccessTokenUseCase(
      userRepository
    );

    console.log("🔄 Refresh Token 검증 중...");
    const { accessToken, newTokenCookie } = await refreshAccessTokenUseCase.execute(refreshToken);
    console.log("✅ Access Token 재발급 완료");

    return new NextResponse(JSON.stringify({ success: true, accessToken }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Set-Cookie": newTokenCookie,  // 쿠키 문자열 그대로 전달
      },
    });
  } catch  {
    return NextResponse.json({ success: false }, { status: 401 });
  }
}

// ✅ API Route는 Node.js 환경에서 실행되도록 설정
export const config = {
  runtime: "nodejs",
};
