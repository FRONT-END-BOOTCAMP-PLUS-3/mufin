export interface IAccessTokenUseCase {
    execute(): Promise<string>;
    renewAccessToken(): Promise<string>;
}