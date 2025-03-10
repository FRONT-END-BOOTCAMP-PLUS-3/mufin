export interface IApprovalKeyUseCase {
    execute(): Promise<string>;
}