import jwt from "jsonwebtoken";
import { serialize } from "cookie";
import { prisma } from "@/config/prismaClient";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const { loginId, password } = await req.json();

    const existingUser = await prisma.user.findUnique({
      where: { loginId },
    });

    if (!existingUser) {
      return new Response(JSON.stringify({ message: "회원정보가 없습니다!" }), {
        status: 401,
      });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return new Response(JSON.stringify({ message: "회원정보가 없습니다!" }), {
        status: 401,
      });
    }

    const payload = {
      userId: existingUser.userId,
      loginId: existingUser.loginId,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });

    const refreshToken = jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    });

    const accessTokenCookie = serialize("token", token, {
      httpOnly: true,
      maxAge: 60 * 60,
      sameSite: "strict",
      path: "/",
    });

    const refreshTokenCookie = serialize("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60,
      sameSite: "strict",
      path: "/",
    });

    return new Response(JSON.stringify({ message: "Logged in" }), {
      status: 200,
      headers: {
        "Set-Cookie": `${accessTokenCookie}, ${refreshTokenCookie}`,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return new Response(JSON.stringify({ message: "Server error" }), {
      status: 500,
    });
  }
}
