import { env } from "@/config/env";

export class KISAccessTokenAdapter {
  public async fetchAccessToken(): Promise<string> {
    const url = `${env.KIS_API_URL}/oauth2/tokenP`;
    const body = {
      grant_type: "client_credentials",
      appkey: env.KIS_APP_KEY,
      appsecret: env.KIS_APP_SECRET,
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(
          `[KIS API] Access Token 요청 실패: (HTTP ${response.status})`
        );
      }

      const data = await response.json();
      if (!data.access_token)
        throw new Error(
          "[KIS API] Access Token 발급 실패: 응답에 access_token 없음"
        );

      return data.access_token;
    } catch (error) {
      console.error("[KIS API] Access Token 발급 오류: ", error);
      throw error;
    }
  }
}
