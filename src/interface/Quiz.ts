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
  name: string;
  timer: number;
  questions: Question[];
}
