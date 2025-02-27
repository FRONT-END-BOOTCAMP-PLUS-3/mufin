export interface IRedisRepository { 
    setApprovalKey(apiKey: string, approvalKey: string): Promise<void> ;
    getApprovalKey(apiKey: string): Promise<string | null>;
    deleteApprovalKey(apiKey: string): Promise<void>
}