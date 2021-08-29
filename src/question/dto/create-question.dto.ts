export class CreateQuestionDto {
    text: string;
    time: number;
    score: number;
    answer: number;
    description: string;
    options: { text: string, value: number }[];
    lessonID: number;
    examID: number;
}
