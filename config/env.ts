import dotenv from "dotenv";
import { z } from "zod";

dotenv.config({ path: ".env.local" });

const envSchema = z.object({
    KAKAO_CLIENT_KEY: z.string().nonempty(),
    KAKAO_CLIENT_SECRET:z.string().nonempty(),
    KAKAO_REDIRECT_URI:z.string().nonempty(),
    NEXTAUTH_SECRET:z.string().nonempty(),
    REDIS_URL: z.string().nonempty(),
    DATABASE_URL: z.string().nonempty(),
  });

  const parsed = envSchema.safeParse(process.env);

  if (!parsed.success) {
    console.error("환경 변수 오류:", parsed.error.format());
    throw new Error("환경 변수 검증 실패!");
  }
  
  // 3) 검증된 결과 export
  export const env = parsed.data;