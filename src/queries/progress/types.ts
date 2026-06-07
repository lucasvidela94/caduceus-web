export type Progress = {
  total_answered: number;
  correct_count: number;
  incorrect_count: number;
  accuracy: number;
  by_category: Record<string, number>;
};
