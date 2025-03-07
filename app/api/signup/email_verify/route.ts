import { NextResponse } from "next/server";
import redisClient from "@/infrastructure/redis/redisClient";

export async function POST(req: Request) {
  try {
    const { email, authCode } = await req.json();

    // Redis에서 저장된 데이터 가져오기
    const storedData = await redisClient.get(`emailAuth:${email}`);
    if (!storedData) {
      return NextResponse.json(
        { error: "인증번호가 만료되었거나 존재하지 않습니다." },
        { status: 400 }
      );
    }

    // JSON 파싱하여 이메일과 인증번호 분리
    const { email: storedEmail, authCode: storedAuthCode } =
      JSON.parse(storedData);

    // 인증번호 검증
    if (storedAuthCode !== authCode || storedEmail !== email) {
      return NextResponse.json(
        { error: "인증번호가 일치하지 않습니다." },
        { status: 400 }
      );
    }

    // 인증 성공 시, Redis에서 해당 키 삭제 (재사용 방지)
    await redisClient.del(`emailAuth:${email}`);

    return NextResponse.json(
      { message: "이메일 인증이 완료되었습니다." },
      { status: 200 }
    );
  } catch (error) {
    console.error("이메일 인증 오류:", error);
    return NextResponse.json({ error: "서버 오류 발생" }, { status: 500 });
  }
}
