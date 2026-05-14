export type Question = {
  id: number
  category_id: number
  body: string
  options: Record<'a' | 'b' | 'c' | 'd', string>
  tier: 'free' | 'plus'
  year: number | null
}

export type AnswerResponse = {
  correct: boolean
  correct_answer: string
  explanation: string
}

export type AnswerParams = {
  questionId: number
  answer: string
}

export type QuestionsParams = {
  category_id?: number
  limit?: number
}
