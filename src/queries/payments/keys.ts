export const paymentKeys = {
  all: ['payments'] as const,
  preference: () => [...paymentKeys.all, 'preference'] as const,
}
