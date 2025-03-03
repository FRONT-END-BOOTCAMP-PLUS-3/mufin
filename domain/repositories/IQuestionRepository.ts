import { Question } from "@prisma/client";

export interface IQuestionRepository {
    create(questionData: {questionText: string, answer:number}): Promise<Question>;

    findByQuestionId(id: string): Promise<Question | null>;
    findRandomQuestionsByQuestionIdNotIn(solvedQuestionIds: number[], limit: number): Promise<Question[]>;
    findAll(): Promise<Question[]>;

    update(questionId: number, updateData: Partial<{ questionText: string; answer: number; }>): Promise<Question>;

    delete(questionId: number): Promise<Question>;
}