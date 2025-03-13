import { ApprovalKeyType } from "@/types/approvalKeyType";

export async function fetchApprovalKey(type: ApprovalKeyType): Promise<string> {
  try {
    const response = await fetch("/api/approval_key", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ type })
    });
  
    if (!response.ok) {
      throw new Error(`[API] Approval Key 요청 실패: ${response.status}`);
    }
  
    const data = await response.json();
    return data.approvalKey;
  
  } catch (error) {
    console.error("[API] Approval Key 요청 실패:", error);
    throw error;
  }
}
