import { api } from '#/lib/api'
import type { Progress } from './types'

export const getProgress = async (): Promise<Progress> => {
  return api.get<Progress>('/api/v1/progress')
}
