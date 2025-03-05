import { Attempt } from "@prisma/client";

export interface IAttemptRepository {

    saveAttempt(userId: string):Promise<void>;
    findQuizDateByUserId(userId: string): Promise<Attempt| null>;
    deleteAttemptByUserId(userId: string): Promise<void>;


}