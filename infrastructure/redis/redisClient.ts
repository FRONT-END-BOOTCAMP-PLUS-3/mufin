import Redis from "ioredis";
import { env } from "@/config/env";

// Redis 클라이언트 생성
const redisClient = new Redis(env.REDIS_URL);

redisClient.on("error", (err) => {
  console.error("❌ Redis connection error:", err);
});

export default redisClient;