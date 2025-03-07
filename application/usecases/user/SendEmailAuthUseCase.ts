import nodemailer from "nodemailer";
import crypto from "crypto";
import { promisify } from "util";
import { IUserRepository } from "@/domain/repositories/IUserRepository";
import redisClient from "@/infrastructure/redis/redisClient";

const setAsync = promisify(redisClient.set).bind(redisClient);
const expireAsync = promisify(redisClient.expire).bind(redisClient);

export class SendEmailAuthCodeUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(email: string): Promise<void> {
    // 중복 이메일 체크
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error("중복된 이메일입니다!");
    }

    // 인증번호 생성 (6자리 랜덤 숫자)
    const authCode = crypto.randomInt(100000, 999999).toString();
    const dataToStore = JSON.stringify({ email, authCode });

    // Redis에 저장 (5분간 유효)
    await setAsync(`emailAuth:${email}`, dataToStore);
    await expireAsync(`emailAuth:${email}`, 300);

    // nodemailer 설정
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.SMTP_EMAIL_USER,
        pass: process.env.SMTP_EMAIL_PASSWORD,
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
  }
}
