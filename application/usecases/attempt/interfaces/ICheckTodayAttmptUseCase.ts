export interface ICheckTodayAttemptUseCase {
    execute(userId: string): Promise<boolean>;
}