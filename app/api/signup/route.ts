import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { name, loginId, password, email } = await req.json();

    // 필수 필드 검증
    if (!name || !loginId || !password || !email) {
      return NextResponse.json(
        { error: "모든 필드를 입력하세요." },
        { status: 400 }
      );
    }

    // 아이디 중복 체크
    const existingUser = await prisma.user.findUnique({
      where: { loginId },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "중복된 아이디입니다." },
        { status: 400 }
      );
    }

    // 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(password, 10);

    // 사용자 정보 저장
    const user = await prisma.user.create({
      data: {
        name,
        loginId,
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      { message: "회원가입 성공", user },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "회원가입 중 오류 발생" },
      { status: 500 }
    );
  }
}
