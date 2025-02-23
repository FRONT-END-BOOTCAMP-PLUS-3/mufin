// 서버 실행을 해야하는데 ts-node로 인한 상대 경로로 해놨습니다.
import { env } from "../../config/env.js";

export class KISApprovalKeyAdapter {
  private static instance: KISApprovalKeyAdapter | null = null;
  private approvalKey: string | null = null;

  private constructor() {}

  public static getInstance(): KISApprovalKeyAdapter {
    if (!KISApprovalKeyAdapter.instance) {
      KISApprovalKeyAdapter.instance = new KISApprovalKeyAdapter();
    }
    return KISApprovalKeyAdapter.instance;
  }

  public async fetchApprovalKey(): Promise<string> {
    if (this.approvalKey) {
      console.log("[KIS API] 기존 Approval Key 재사용:", this.approvalKey);
      return this.approvalKey;
    }

    const url = `${env.KIS_API_URL}/oauth2/Approval`;
    const body = {
      grant_type: "client_credentials",
      appkey: env.KIS_APP_KEY,
      secretkey: env.KIS_APP_SECRET,
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; utf-8",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(
          `[KIS API] Approval Key 요청 실패 (HTTP Status: ${response.status})`
        );
      }

      const data = await response.json();

      this.approvalKey = data.approval_key;

      if (!this.approvalKey)
        throw new Error(
          "[KIS API] WebSocket 접속키 발급 실패: 응답에 approval_key 없음"
        );

      return this.approvalKey;
    } catch (error) {
      console.error("[KIS API] Approval Key 요청 실패: ", error);
      throw error;
    }
  }

  public getApprovalKey(): string {
    if (!this.approvalKey) {
      throw new Error("Approval Key가 존재하지 않습니다. 서버를 재시작하세요.");
    }
    return this.approvalKey!;
  }
}
