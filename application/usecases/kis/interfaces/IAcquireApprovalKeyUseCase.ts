import { ApprovalKeyType } from "@/types/approvalKeyType";
import { ApprovalKeyResult } from "@/application/usecases/kis/AcquireApprovalKeyUseCase";

export interface IAcquireApprovalKeyUseCase {
    execute(type:ApprovalKeyType): Promise<ApprovalKeyResult>;
}