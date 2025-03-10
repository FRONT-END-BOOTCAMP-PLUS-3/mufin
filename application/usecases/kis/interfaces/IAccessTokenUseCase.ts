export interface IAccessTokenUseCase {
    execute(): Promise<string>;
}