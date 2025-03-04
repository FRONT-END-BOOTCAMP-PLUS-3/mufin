export interface ISubmitQuizAnswerUseCase {
    execute(userId: string, questionId: number): Promise<void>;
}