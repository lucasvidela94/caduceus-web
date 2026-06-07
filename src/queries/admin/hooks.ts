import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminKeys } from "./keys";
import {
  getAdminQuestions,
  getAdminQuestion,
  createAdminQuestion,
  updateAdminQuestion,
  deleteAdminQuestion,
  getAdminCategories,
  getAdminCategory,
  createAdminCategory,
  updateAdminCategory,
  deleteAdminCategory,
  getAdminUsers,
  getAdminUser,
  updateAdminUser,
  getAdminPayments,
  getAdminPayment,
} from "./service";
import type { CreateQuestionInput, CreateCategoryInput, UpdateUserInput } from "./types";

// Questions
export const useAdminQuestions = () =>
  useQuery({
    queryKey: adminKeys.questions.list(),
    queryFn: getAdminQuestions,
  });

export const useAdminQuestion = (id: string) =>
  useQuery({
    queryKey: adminKeys.questions.detail(id),
    queryFn: () => getAdminQuestion(id),
    enabled: !!id,
  });

export const useCreateAdminQuestion = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: CreateQuestionInput) => createAdminQuestion(input),
    onSuccess: () => qc.invalidateQueries({ queryKey: adminKeys.questions.all }),
  });
};

export const useUpdateAdminQuestion = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: CreateQuestionInput }) =>
      updateAdminQuestion(id, input),
    onSuccess: () => qc.invalidateQueries({ queryKey: adminKeys.questions.all }),
  });
};

export const useDeleteAdminQuestion = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteAdminQuestion(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: adminKeys.questions.all }),
  });
};

// Categories
export const useAdminCategories = () =>
  useQuery({
    queryKey: adminKeys.categories.list(),
    queryFn: getAdminCategories,
  });

export const useAdminCategory = (id: string) =>
  useQuery({
    queryKey: adminKeys.categories.detail(id),
    queryFn: () => getAdminCategory(id),
    enabled: !!id,
  });

export const useCreateAdminCategory = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: CreateCategoryInput) => createAdminCategory(input),
    onSuccess: () => qc.invalidateQueries({ queryKey: adminKeys.categories.all }),
  });
};

export const useUpdateAdminCategory = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: CreateCategoryInput }) =>
      updateAdminCategory(id, input),
    onSuccess: () => qc.invalidateQueries({ queryKey: adminKeys.categories.all }),
  });
};

export const useDeleteAdminCategory = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteAdminCategory(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: adminKeys.categories.all }),
  });
};

// Users
export const useAdminUsers = () =>
  useQuery({
    queryKey: adminKeys.users.list(),
    queryFn: getAdminUsers,
  });

export const useAdminUser = (id: string) =>
  useQuery({
    queryKey: adminKeys.users.detail(id),
    queryFn: () => getAdminUser(id),
    enabled: !!id,
  });

export const useUpdateAdminUser = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: UpdateUserInput }) =>
      updateAdminUser(id, input),
    onSuccess: () => qc.invalidateQueries({ queryKey: adminKeys.users.all }),
  });
};

// Payments
export const useAdminPayments = () =>
  useQuery({
    queryKey: adminKeys.payments.list(),
    queryFn: getAdminPayments,
  });

export const useAdminPayment = (id: string) =>
  useQuery({
    queryKey: adminKeys.payments.detail(id),
    queryFn: () => getAdminPayment(id),
    enabled: !!id,
  });
