export interface IRecordRepository {
    saveRecord(userId: string, questionId: number) : Promise<void>
}