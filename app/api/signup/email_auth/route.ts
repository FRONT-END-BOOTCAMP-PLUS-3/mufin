import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import crypto from "crypto";
import { promisify } from "util";
import redisClient from "@/infrastructure/redis/redisClient";

const setAsync = promisify(redisClient.set).bind(redisClient);
const expireAsync = promisify(redisClient.expire).bind(redisClient);

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    // 인증번호 생성 (6자리 랜덤 숫자)
    const authCode = crypto.randomInt(100000, 999999).toString();
    const dataToStore = JSON.stringify({ email, authCode });

    // Redis에 저장
    await setAsync(`emailAuth:${email}`, dataToStore);
    await expireAsync(`emailAuth:${email}`, 300);

    // nodemailer 설정
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // 이메일 전송 옵션
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Mufin 이메일 인증번호",
      html: `
        <h1 style="color:#5865f2;">Mufin</h1>
        <p>안녕하세요 머핀입니다! 이메일 인증을 위한 인증번호입니다.</p>
        <h2 style="color:blue;">🔢 ${authCode}</h2>
        <p>이 인증번호는 <b>5분</b> 동안 유효합니다.</p>
      `,
    };

    // 이메일 전송
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "인증번호가 이메일로 전송되었습니다." },
      { status: 200 }
    );
  } catch (error) {
    console.error("이메일 인증번호 전송 오류:", error);
    return NextResponse.json(
      { error: "이메일 전송 중 오류 발생" },
      { status: 500 }
    );
  }
}
