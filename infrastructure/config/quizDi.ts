import { GetRandomQuestionUseCase } from "@/application/usecases/quiz/GetQuestionUseCase";
import { PgQuestionRepository } from "@/infrastructure/repositories/PgQuestionRepositroy";
import { PgRecordRepository } from "@/infrastructure/repositories/PgRecordRepository";
import { PgChoiceRepository } from "@/infrastructure/repositories/PgChoiceRepository";
import { PgWalletRepository } from "@/infrastructure/repositories/PgWalletRepository";
import { SubmitQuizAnswerUseCase } from "@/application/usecases/quiz/SubmitQuizAnswerUseCase";


export const quizDi = {
    getRandomQuestionUseCase: new GetRandomQuestionUseCase(
        new PgQuestionRepository(), new PgRecordRepository(), new PgChoiceRepository()
    ),

    submitQuizAnswerUseCase: new SubmitQuizAnswerUseCase(
        new PgRecordRepository(), new PgWalletRepository()
    ),
}