import { prisma } from "@/config/prismaClient";
import { IAttemptRepository } from "@/domain/repositories/IAttempRespository";
import { Attempt } from "@prisma/client";

export class PgAttemptRepository implements IAttemptRepository{
    /**
     * @param userId 
     * @returns 
     */
    async saveAttempt(userId: string): Promise<void> {
        console.log("userID repo input", userId);
        try {
            await prisma.attempt.upsert({
              where: { userId },
              update: { quizDate: new Date() },
              create: { userId , quizDate: new Date()},
            });
          } catch (error) {
            console.error("Error in saveAttempt:", error);
            throw error;
          }
    }
    async findQuizDateByUserId(userId: string): Promise<Attempt | null> {
        try{
        return await prisma.attempt.findUnique({
            where: { userId }
        })
    }catch (error){
        console.error("Error in findQuizDateByUserId:", error);
        throw error;
    }
    }
    async deleteAttemptByUserId(userId: string): Promise<void> {
        try{await  prisma.attempt.delete({
            where: { userId}
        })
    } catch (error) {
        console.error("Error in deleteAttemptByUserId:", error);
        throw error;
    }
    }

}