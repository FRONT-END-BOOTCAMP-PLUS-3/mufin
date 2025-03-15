import { ApprovalKeyType, ApprovalStatus } from "@/types/approvalKeyType";

export async function fetchApprovalKey(
  type: ApprovalKeyType,
  status: ApprovalStatus,
  usedApiKeyName?: string
): Promise<{ approvalKey: string; usedApiKeyName: string } | void> {
  try {
    // "stop" 상태일 때 usedApiKeyName은 필수입니다.
    if (status === "stop" && !usedApiKeyName) {
      throw new Error("Missing usedApiKeyName for stop status");
    }

    // status에 따라 요청 body 구성
    const body =
      status === "start"
        ? JSON.stringify({ type, status })
        : JSON.stringify({ type, status, usedApiKeyName });

    const response = await fetch("/api/approval_key", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });

    if (!response.ok) {
      throw new Error(`[API] Approval Key 요청 실패: ${response.status}`);
    }

    const data = await response.json();

    // start 상태일 경우 approvalKey와 usedApiKeyName 반환 (stop 상태는 아무것도 반환하지 않음)
    if (status === "start") {
      return { approvalKey: data.approvalKey, usedApiKeyName: data.usedApiKeyName };
    }
  } catch (error) {
    console.error("[API] Approval Key 요청 실패:", error);
    throw error;
  }
}
