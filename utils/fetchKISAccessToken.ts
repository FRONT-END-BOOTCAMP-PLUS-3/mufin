import { env } from "@/config/env";

export async function fetchKISAccessToken(): Promise<string> {
  try {
    const response = await fetch(`${env.NEXT_PUBLIC_BASE_URL}/api/kis_access_token`, { method: "GET" });

    if (!response.ok) {
      throw new Error(`[KIS API] Access Token 요청 실패: ${response.status}`);
    }

    const data = await response.json();
    return data.KISAccessToken;

  } catch (error) {
    console.error("[KIS API] Access Token 요청 실패:", error);
    throw error;
  }
  
}
