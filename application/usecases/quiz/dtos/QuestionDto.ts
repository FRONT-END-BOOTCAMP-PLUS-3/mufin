import { ChoiceDto } from "@/application/usecases/quiz/dtos/ChoiceDto";

export interface QuestionDto {
    questionId: number;
    questionText: string;
    answer: number;
    choices: ChoiceDto[];
}