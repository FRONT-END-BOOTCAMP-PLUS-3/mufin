export async function fetchApprovalKey(): Promise<void> {
    try {
      const response = await fetch("/api/approval_key", { method: "POST" });
  
      if (!response.ok) {
        throw new Error(`[API] Approval Key 요청 실패: ${response.status}`);
      }
  
    } catch (error) {
      console.error("[API] Approval Key 요청 실패:", error);
      throw error;
    }
    
  }
  