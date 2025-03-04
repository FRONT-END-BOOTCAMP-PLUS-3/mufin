export interface IRedisRepository { 
    setApprovalKey(apiKey: string, approvalKey: string): Promise<void> ;
    getApprovalKey(apiKey: string): Promise<string | null>;
    deleteApprovalKey(apiKey: string): Promise<void>;
    setKISAccessToken(apiKey: string, kISAccessToken:string): Promise<void>;
    getKISAccessToken(apiKey: string): Promise<string | null>
    deleteKISAccessToken(apiKey: string): Promise<void>
}