export interface ISubmitQuizAnswerUseCase {
    execute(userId: string, questionId: number, reword: number): Promise<void>;
}