import { ChoiceDto } from "@/application/usecases/quiz/dtos/ChoiceDto";

export interface ResponseQuizDto {
    index: number;
    questionId: number;
    questionText: string;
    answer: number;
    choices: ChoiceDto[];
}