import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { prisma } from "@/config/prismaClient";

export async function GET() {
  try {
    const cookieStore = await cookies();
    let token = cookieStore.get("token")?.value;
    const refreshToken = cookieStore.get("refreshToken")?.value;
    // 새 Access Token이 발급된 경우 저장할 Set-Cookie 헤더 값
    let newTokenCookie = "";

    if (!token && !refreshToken) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
      });
    }

    let decoded;
    try {
      if (token) {
        decoded = jwt.verify(token, process.env.JWT_SECRET as string);
      } else {
        throw new Error("No token provided");
      }
    } catch (error) {
      // Access Token이 없거나 유효하지 않은 경우 refresh token으로 새 토큰 발급 시도
      if (refreshToken) {
        try {
          const refreshDecoded = jwt.verify(
            refreshToken,
            process.env.JWT_SECRET as string
          );
          // 새로운 Access Token 발급 (유효시간 1시간)
          token = jwt.sign(
            { loginId: (refreshDecoded as { loginId: string }).loginId },
            process.env.JWT_SECRET as string,
            { expiresIn: "1h" }
          );
          newTokenCookie = `token=${token}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=3600`;
          decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        } catch (refreshError) {
          return new Response(
            JSON.stringify({ message: "Refresh token expired." }),
            { status: 401 }
          );
        }
      } else {
        return new Response(JSON.stringify({ message: "Invalid token" }), {
          status: 401,
        });
      }
    }

    // DB에서 사용자 조회
    const user = await prisma.user.findUnique({
      where: { loginId: (decoded as { loginId: string }).loginId },
      select: { loginId: true, name: true },
    });

    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    // 최종 응답 헤더에 Content-Type과 함께, 새 토큰 쿠키가 있다면 추가
    const headers = new Headers({ "Content-Type": "application/json" });
    if (newTokenCookie) {
      headers.append("Set-Cookie", newTokenCookie);
    }

    return new Response(JSON.stringify(user), {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error("User fetch error:", error);
    return new Response(JSON.stringify({ message: "Server error" }), {
      status: 500,
    });
  }
}
