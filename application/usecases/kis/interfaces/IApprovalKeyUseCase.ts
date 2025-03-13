import { ApprovalKeyType } from "@/types/approvalKeyType";

export interface IApprovalKeyUseCase {
    execute(type:ApprovalKeyType): Promise<string>;
}