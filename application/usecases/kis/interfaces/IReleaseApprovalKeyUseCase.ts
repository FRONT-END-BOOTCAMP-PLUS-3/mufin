import { ApprovalKeyType } from "@/types/approvalKeyType";

export interface IReleaseApprovalKeyUseCase {
    execute(type: ApprovalKeyType, usedApiKeyName: string): Promise<void>;
}