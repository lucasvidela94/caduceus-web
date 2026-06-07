export const progressKeys = {
  all: ["progress"] as const,
  stats: () => [...progressKeys.all, "stats"] as const,
};
