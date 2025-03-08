export interface IRedisRepository { 
    saveKISValue(prefix: string, apiKey: string, value: string): Promise<void>
    findKISValue(prefix: string, apiKey: string): Promise<string | null>
    deleteKISValue(prefix: string, apiKey: string): Promise<void>
}