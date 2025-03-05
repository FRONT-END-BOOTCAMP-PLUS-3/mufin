import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ message: "userId가 필수로 제공되어야 합니다." }, { status: 400 });
  }

  // 추가적인 로직
  return NextResponse.json({ message: `User ID: ${userId}` }, { status: 200 });
}
