import { api } from '#/lib/api'
import type { PaymentPreference } from './types'

export const createPreference = async (): Promise<PaymentPreference> => {
  return api.post<PaymentPreference>('/api/v1/payments')
}
