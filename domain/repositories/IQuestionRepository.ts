import { Question } from "@prisma/client";

export interface IQuestionRepository {
    findQuestionById( questionId: number ): Promise<Question| null>;

}