export interface ISaveAttemptUseCase {
    execute(userId:string): Promise<void>;
}