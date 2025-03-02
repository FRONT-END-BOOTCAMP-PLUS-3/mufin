import { IGetChoicesUseCase } from "@/application/usecases/quiz/interfaces/IGetChoicesUseCase";
import { IChoiceRepository } from "@/domain/repositories/IChoiceRepository";
import { ChoiceDto } from "@/application/usecases/quiz/dtos/ChoiceDto";

export class GetChoicesUseCase implements IGetChoicesUseCase {
  
    constructor(private readonly choiceRepository: IChoiceRepository) {}
  
  async execute(questionId: number): Promise<ChoiceDto[]> {
    const choices = await this.choiceRepository.findChoicesByQuestionId(
      questionId
    );
    return choices.map((choice) => ({
      choiceId: choice.choiceId,
      choiceText: choice.choiceText,
      choiceNumber: choice.choiceNumber,
    }));
  }
}
