import { ApprovalKeyEntity } from "@/domain/entities/ApprovalKeyEntity";
export interface IRedisRepository { 
    saveKISApprovalKeyData(prefix: string, apiKey: string, value: ApprovalKeyEntity): Promise<void>;
    findKISApprovalKeyData(prefix: string, apiKey: string): Promise<ApprovalKeyEntity | null>;
    deleteKISApprovalKeyData(prefix: string, apiKey: string): Promise<void>;
    updateInUseWithoutResetTTL(prefix: string, apiKey: string,  newInUse: boolean): Promise<string | null>;
    saveKISAccessToken(prefix: string, apiKey: string, value: string): Promise<void>;
    findKISAccessToken(prefix: string, apiKey: string): Promise<string | null>;
    deleteKISAccessToken(prefix: string, apiKey: string): Promise<void>;
}