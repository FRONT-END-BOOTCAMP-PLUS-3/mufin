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
}