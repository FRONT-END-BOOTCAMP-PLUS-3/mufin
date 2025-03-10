import dotenv from "dotenv";
import { z } from "zod";

dotenv.config({ path: ".env" });

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