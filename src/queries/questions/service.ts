import { api } from "#/lib/api";
import type {
  Question,
  QuestionDetail,
  AnswerResponse,
  AnswerParams,
  QuestionsParams,
} from "./types";

export const getQuestions = async (params?: QuestionsParams): Promise<Question[]> => {
  const search = new URLSearchParams();
  if (params?.category_id) search.set("category_id", String(params.category_id));
  if (params?.limit) search.set("limit", String(params.limit));

  const qs = search.toString();
  return api.get<Question[]>(`/api/v1/questions${qs ? `?${qs}` : ""}`);
};

export const getQuestion = async (id: string): Promise<QuestionDetail> => {
  return api.get<QuestionDetail>(`/api/v1/questions/${id}`);
};

export const answerQuestion = async ({
  questionId,
  answer,
}: AnswerParams): Promise<AnswerResponse> => {
  return api.post<AnswerResponse>(`/api/v1/questions/${questionId}/answer`, { answer });
};
