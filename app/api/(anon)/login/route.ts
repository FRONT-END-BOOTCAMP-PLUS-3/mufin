// app/api/(anon)/login/route.ts
import jwt from "jsonwebtoken";
import { serialize } from "cookie";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { userId, password } = await req.json();

    const existingUser = await prisma.user.findUnique({
      where: { userId },
    });

    if (!existingUser) {
      return new Response(JSON.stringify({ message: "Invalid credentials" }), {
        status: 401,
      });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return new Response(JSON.stringify({ message: "Invalid credentials" }), {
        status: 401,
      });
    }

    const payload = { userId: existingUser.userId };
    const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });

    const cookieOptions = serialize("token", token, {
      httpOnly: true,
      maxAge: 60 * 60,
      sameSite: "strict",
      path: "/",
    });

    return new Response(JSON.stringify({ message: "Logged in" }), {
      status: 200,
      headers: {
        "Set-Cookie": cookieOptions,
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
