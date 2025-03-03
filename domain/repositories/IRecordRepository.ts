export interface IRecordRepository {
    saveRecord(userId: string, questionId: number) : Promise<void>;
    findRecordCountByUserId(userId: string): Promise<Record<number, number>>;
}