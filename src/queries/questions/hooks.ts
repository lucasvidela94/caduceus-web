import { useQuery, useMutation } from '@tanstack/react-query'
import { questionKeys } from './keys'
import { getQuestions, answerQuestion } from './service'
import type { Question, AnswerResponse, AnswerParams, QuestionsParams } from './types'

export const useQuestions = (params?: QuestionsParams) => {
  return useQuery<Question[]>({
    queryKey: questionKeys.list(params as Record<string, string | number>),
    queryFn: () => getQuestions(params),
  })
}

export const useAnswerQuestion = () => {
  return useMutation<AnswerResponse, Error, AnswerParams>({
    mutationFn: answerQuestion,
  })
}
