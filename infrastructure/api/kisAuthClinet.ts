import { env } from "@/config/env";

export class KISAuthClient {
  /**
   * KIS API를 호출하여 Approval Key를 요청합니다.
   * @returns Approval Key (string)
   * @throws Error - 요청 실패 또는 응답에 approval_key가 없을 경우
   */
  async getApprovalKey(): Promise<string> {
    const url = `${env.KIS_API_URL}/oauth2/Approval`;
    const body = JSON.stringify({
      grant_type: "client_credentials",
      appkey: env.KIS_APP_KEY,
      secretkey: env.KIS_APP_SECRET,
    });

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json; utf-8" },
      body: body,
    });

    if (!response.ok) {
      throw new Error(
        `[KIS API] Approval Key 요청 실패 (HTTP Status: ${response.status})`
      );
    }

    const data = await response.json();
    if (!data.approval_key) {
      throw new Error(
        "[KIS API] Approval Key 발급 실패: 응답에 approval_key 없음"
      );
    }
    return data.approval_key;
  }
  
  /**
   * KIS API를 호출하여 Access Token을 요청합니다.
   * @returns Access Token (string)
   * @throws Error - 요청 실패 또는 응답에 access_token이 없을 경우
   */
  async getAccessToken(): Promise<string> {
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
      throw new Error(
        `[KIS API] AccessToken 요청 실패 (HTTP Status: ${response.status})`
      );
    }

    const data = await response.json();
    if (!data.access_token) {
      throw new Error(
        "[KIS API] AccessToken 발급 실패: 응답에 access_token 없음"
      );
    }
    return data.access_token;
  }
}
