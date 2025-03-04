import { NextResponse } from "next/server";
import { env } from "@/config/env";
import { RedisRepository } from "@/infrastructure/repositories/RedisRepository";
import { IRedisRepository } from "@/domain/repositories/IRedisRepository";

const redisRepository:IRedisRepository = new RedisRepository(); // Approval Key 저장

export async function GET() {
  try {
      const apiKey = env.KIS_APP_KEY;
  
      // Step 1: Redis에서 approval_key 조회
      let accessToken = await redisRepository.getKISAccessToken(apiKey);
  
      if (accessToken) {
        console.log(`[CACHE HIT] Redis에서 Approval Key 가져옴: ${accessToken}`);
        return NextResponse.json({ accessToken });
      }
  
      console.log("[CACHE MISS] Redis에 없음, KIS API에서 요청");
  
      // Step 2: KIS API에서 Approval Key 요청
      const url = `${env.KIS_API_URL}/oauth2/tokenP`;
  
      const body = JSON.stringify({
        grant_type: "client_credentials",
        appkey: env.KIS_APP_KEY,
        appsecret: env.KIS_APP_SECRET,
      });
  
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json; utf-8" },
        body: body,
      });
  
      if (!response.ok) {
        console.error(
          `[KIS API] Approval Key 요청 실패 (HTTP Status: ${response.status})`
        );
        return NextResponse.json(
          { error: `[KIS API] Approval Key 요청 실패 (HTTP Status: ${response.status})` },
          { status: response.status }
        );
      }
  
      const data = await response.json();
      accessToken = data.access_token;
  
      if (!accessToken) {
        console.error("[KIS API] WebSocket 접속키 발급 실패: 응답에 approval_key 없음");
        return NextResponse.json(
          { error: "[KIS API] WebSocket 접속키 발급 실패: 응답에 approval_key 없음" },
          { status: 500 }
        );
      }
  
      // Step 3: Redis에 approval_key 저장 (24시간 TTL)
      await redisRepository.setKISAccessToken(apiKey, accessToken);
      console.log("[CACHE UPDATE] Approval Key 저장 완료!");
  
      return NextResponse.json({ accessToken });
    } catch (error) {
      console.error("Approval Key 가져오기 실패:", error);
      return NextResponse.json(
        { error: "서버의 일시적인 오류가 발생했습니다." },
        { status: 500 }
      );
    }
}
