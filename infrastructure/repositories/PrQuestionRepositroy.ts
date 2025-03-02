import { prisma } from "@/config/prismaClient";
import { IQuestionRepository } from "@/domain/repositories/IQuestionRepository";
import { Question } from "@prisma/client";

export class PrQuestionRepository implements IQuestionRepository{
    async findQuestionById(questionId: number): Promise<Question | null> {
        return await prisma.question.findUnique({
            where: {questionId},
        })
    }
}