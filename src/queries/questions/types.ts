export type Question = {
  id: string;
  category_id: string;
  body: string;
  options: Record<"a" | "b" | "c" | "d", string>;
  tier: number; // 0 = free, 1 = plus
  year: number | null;
};

export type AnswerResponse = {
  correct: boolean;
  correct_answer: string;
  explanation: string | null;
};

export type AnswerParams = {
  questionId: string;
  answer: string;
};

export type QuestionDetail = Question & {
  correct_answer: string;
  explanation: string | null;
};

export type QuestionsParams = {
  category_id?: string;
  limit?: number;
};
