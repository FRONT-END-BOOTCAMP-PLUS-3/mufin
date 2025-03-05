import { ICheckTodayAttemptUseCase } from "@/application/usecases/attempt/interfaces/ICheckTodayAttmptUseCase";
import { IAttemptRepository } from "@/domain/repositories/IAttempRespository";

export class CheckTodayAttemptUseCase implements ICheckTodayAttemptUseCase{
    
    constructor(private readonly attemptRepository: IAttemptRepository){}

    /**
     * 
     * @param userId  : uuid의 user식별자
     * @return 오늘 하루 풀었는지 상태 반환
     */
    async execute(userId: string): Promise<boolean> {

        const attempt = await this.attemptRepository.findQuizDateByUserId(userId);

        if(!attempt) {
            return false;
        }

        const today = new Date();
        const todayDate = today.toISOString().split("T")[0];
        const attemptDate = attempt.quizDate.toISOString().split("T")[0];

        return attemptDate === todayDate;

    }

    

}