import { useQuery } from "@tanstack/react-query";
import { categoryKeys } from "./keys";
import { getCategories } from "./service";
import type { Category } from "./types";

export const useCategories = () => {
  return useQuery<Category[]>({
    queryKey: categoryKeys.list(),
    queryFn: getCategories,
    staleTime: 10 * 60 * 1000,
  });
};
