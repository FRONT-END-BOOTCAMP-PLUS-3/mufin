import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { serialize } from "cookie";

const prisma = new PrismaClient();

export async function DELETE() {
  try {
    // 1. 쿠키에서 JWT 가져오기
    const token = (await cookies()).get("token")?.value;

    if (!token) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
      });
    }

    // 2. 토큰 검증
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    } catch (error) {
      return new Response(JSON.stringify({ message: "Invalid token" }), {
        status: 401,
      });
    }

    const loginId = (decoded as { loginId: string }).loginId;

    // 3. 사용자 삭제
    const deletedUser = await prisma.user.delete({
      where: { loginId },
    });

    // 4. 쿠키 삭제 (로그아웃)
    const cookieOptions = serialize("token", "", {
      httpOnly: true,
      maxAge: 0,
      sameSite: "strict",
      path: "/",
    });

    return new Response(
      JSON.stringify({ message: "Account deleted successfully" }),
      {
        status: 200,
        headers: {
          "Set-Cookie": cookieOptions,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Account deletion error:", error);
    return new Response(JSON.stringify({ message: "Server error" }), {
      status: 500,
    });
  }
}
