import { Choice } from "@prisma/client";

export interface IChoiceRepository {
//   createChoices(choices: { questionId: number; choiceText: string; choiceNumber: number }[]): Promise<boolean>;
  findChoicesByQuestionId(questionId: number): Promise<Choice[]>;
//   updateChoice(choiceId: number, updatedData: Partial<Pick<Choice, "choiceText" | "choiceNumber">>): Promise<Choice | null>;
//   deleteChoice(choiceId: number): Promise<void>;
}
