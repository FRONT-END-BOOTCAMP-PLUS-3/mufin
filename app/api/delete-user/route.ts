import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { serialize } from "cookie";
import { prisma } from "@/config/prismaClient";
import { NextResponse } from "next/server";

export async function DELETE() {
  try {
    // 1. 쿠키에서 JWT 가져오기
    const token = (await cookies()).get("token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // 2. 토큰 검증
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    } catch (error) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    const loginId = (decoded as { loginId: string }).loginId;

    // 3. 쿠키 삭제 (로그아웃 처리)
    const cookieOptions = serialize("token", "", {
      httpOnly: true,
      maxAge: 0,
      sameSite: "strict",
      path: "/",
    });

    // 4. 사용자 삭제
    const deletedUser = await prisma.user.delete({
      where: { loginId },
    });

    console.log(deletedUser);

    const response = NextResponse.json(
      { message: "Account deleted successfully" },
      { status: 200 }
    );

    response.headers.set("Set-Cookie", cookieOptions);
    return response;
  } catch (error) {
    console.error("Account deletion error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
