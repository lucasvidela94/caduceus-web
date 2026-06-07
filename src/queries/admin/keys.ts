const adminBase = ["admin"] as const;

export const adminKeys = {
  all: adminBase,
  questions: {
    all: [...adminBase, "questions"] as const,
    list: () => [...adminBase, "questions", "list"] as const,
    detail: (id: string) => [...adminBase, "questions", "detail", id] as const,
  },
  categories: {
    all: [...adminBase, "categories"] as const,
    list: () => [...adminBase, "categories", "list"] as const,
    detail: (id: string) => [...adminBase, "categories", "detail", id] as const,
  },
  users: {
    all: [...adminBase, "users"] as const,
    list: () => [...adminBase, "users", "list"] as const,
    detail: (id: string) => [...adminBase, "users", "detail", id] as const,
  },
  payments: {
    all: [...adminBase, "payments"] as const,
    list: () => [...adminBase, "payments", "list"] as const,
    detail: (id: string) => [...adminBase, "payments", "detail", id] as const,
  },
};
