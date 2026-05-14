export const questionKeys = {
  all: ['questions'] as const,
  list: (filters?: Record<string, string | number>) =>
    [...questionKeys.all, 'list', filters] as const,
  detail: (id: number) => [...questionKeys.all, 'detail', id] as const,
}
