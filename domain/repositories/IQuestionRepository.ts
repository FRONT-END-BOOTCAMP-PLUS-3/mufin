import { Question } from "@prisma/client";
import {Question as QuestionEntity} from "@/domain/entities/Question"

export interface IQuestionRepository {
    create(questionData: {questionText: string, answer:number}): Promise<Question>;

    findByQuestionId(id: string): Promise<Question | null>;
    findRandomQuestionsByQuestionIdNotIn(userId: string, solvedQuestionIds: number[], limit: number): Promise<QuestionEntity[]>;
    findAll(): Promise<Question[]>;

    update(questionId: number, updateData: Partial<{ questionText: string; answer: number; }>): Promise<Question>;

    delete(questionId: number): Promise<Question>;
}