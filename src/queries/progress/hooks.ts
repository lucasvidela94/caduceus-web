import { useQuery } from '@tanstack/react-query'
import { progressKeys } from './keys'
import { getProgress } from './service'
import type { Progress } from './types'

export const useProgress = () => {
  return useQuery<Progress>({
    queryKey: progressKeys.stats(),
    queryFn: getProgress,
  })
}
