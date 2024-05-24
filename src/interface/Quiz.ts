export interface Answer {
  value: string;
  isCorrect: boolean;
  pointsPerQuestion: number;
  correctAnswer?: string;
}

export interface Question {
  question: string;
  type: "select" | "multi-select" | "text";
  answers: Answer[];
}

export interface QuizFormValues {
  id: string;
  name: string;
  timer: number;
  questions: Question[];
}
