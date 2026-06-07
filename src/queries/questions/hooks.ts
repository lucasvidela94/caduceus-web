import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { questionKeys } from "./keys";
import { getQuestions, getQuestion, answerQuestion } from "./service";
import type {
  Question,
  QuestionDetail,
  AnswerResponse,
  AnswerParams,
  QuestionsParams,
} from "./types";

export const useQuestion = (id: string) => {
  return useQuery<QuestionDetail>({
    queryKey: questionKeys.detail(id),
    queryFn: () => getQuestion(id),
    enabled: !!id,
  });
};

export const useQuestions = (params?: QuestionsParams) => {
  return useQuery<Question[]>({
    queryKey: questionKeys.list(params as Record<string, string | number>),
    queryFn: () => getQuestions(params),
  });
};

export const useAnswerQuestion = () => {
  const qc = useQueryClient();
  return useMutation<AnswerResponse, Error, AnswerParams>({
    mutationFn: answerQuestion,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["progress"] });
    },
  });
};
