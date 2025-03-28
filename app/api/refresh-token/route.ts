import jwt, { JwtPayload } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { env } from "@/config/env";

export async function POST(req: NextRequest) {
  try {
    const cookieHeader = req.headers.get("Cookie");
    const refreshToken = cookieHeader
      ?.split("; ").find((c) => c.startsWith("refreshToken="))?.split("=")[1];

    if (!refreshToken) {
      return NextResponse.json(
        { success: false, message: "Refresh token not found in cookies" },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(refreshToken, env.JWT_SECRET) as JwtPayload;
    const newToken = jwt.sign(
      { loginId: decoded.loginId, userId: decoded.userId }, env.JWT_SECRET as string,{ expiresIn: "1h" }
    );

    return NextResponse.json({ success: true, newToken }, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "서버의 일시적인 오류가 발생했습니다." }, { status: 500 }
    );
  }
}

