import dotenv from "dotenv";
import { z } from "zod";

dotenv.config({ path: ".env" });

console.log("🔍 환경 변수 확인:");
console.log("NEXTAUTH_SECRET:", process.env.NEXTAUTH_SECRET);
console.log("REDIS_URL:", process.env.REDIS_URL);
console.log("KIS_API_URL:", process.env.KIS_API_URL);
console.log("KIS_APP_KEY:", process.env.KIS_APP_KEY);
console.log("KIS_APP_SECRET:", process.env.KIS_APP_SECRET);
console.log("NEXT_PUBLIC_BASE_URL:", process.env.NEXT_PUBLIC_BASE_URL);
console.log("JWT_SECRET:", process.env.JWT_SECRET);
console.log("SMTP_EMAIL_USER:", process.env.SMTP_EMAIL_USER);
console.log("SMTP_EMAIL_PASSWORD:", process.env.SMTP_EMAIL_PASSWORD);

const envSchema = z.object({
    NEXTAUTH_SECRET:z.string().nonempty(),
    REDIS_URL: z.string().url(),
    KIS_API_URL: z.string().url(),
    KIS_APP_KEY: z.string().nonempty(),
    KIS_APP_SECRET: z.string().nonempty(),
    NEXT_PUBLIC_BASE_URL: z.string().url(),
    JWT_SECRET:z.string().nonempty(),
    SMTP_EMAIL_USER:z.string().email(),
    SMTP_EMAIL_PASSWORD: z.string().nonempty(),
  });

  const parsed = envSchema.safeParse(process.env);

  if (!parsed.success) {
    console.error("환경 변수 오류:", parsed.error.format());
    throw new Error("환경 변수 검증 실패!");
  }
  
  // 3) 검증된 결과 export
  export const env = parsed.data;