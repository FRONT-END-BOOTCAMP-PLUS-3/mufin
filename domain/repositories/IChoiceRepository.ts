import { Choice } from "@prisma/client";

export interface IChoiceRepository {
  createChoice(choiceData: { questionId: number; choiceText: string; choiceNumber: number }): Promise<Choice>;
  findChoicesByQuestionId(questionId: number): Promise<Choice[]>;
  update(choiceId: number, updateData: Partial<{ choiceText: string; choiceNumber: number; }>): Promise<Choice>;
  delete(choiceId: number): Promise<Choice>;
}
