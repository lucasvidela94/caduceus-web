import { api } from "#/lib/api";
import type {
  AdminQuestion,
  AdminCategory,
  AdminUser,
  AdminPayment,
  CreateQuestionInput,
  CreateCategoryInput,
  UpdateUserInput,
} from "./types";

// Questions
export const getAdminQuestions = async (): Promise<AdminQuestion[]> =>
  api.get<AdminQuestion[]>("/admin/questions");

export const getAdminQuestion = async (id: string): Promise<AdminQuestion> =>
  api.get<AdminQuestion>(`/admin/questions/${id}`);

export const createAdminQuestion = async (input: CreateQuestionInput): Promise<AdminQuestion> =>
  api.post<AdminQuestion>("/admin/questions", input);

export const updateAdminQuestion = async (
  id: string,
  input: CreateQuestionInput,
): Promise<AdminQuestion> => api.put<AdminQuestion>(`/admin/questions/${id}`, input);

export const deleteAdminQuestion = async (id: string): Promise<void> =>
  api.delete(`/admin/questions/${id}`);

// Categories
export const getAdminCategories = async (): Promise<AdminCategory[]> =>
  api.get<AdminCategory[]>("/admin/categories");

export const getAdminCategory = async (id: string): Promise<AdminCategory> =>
  api.get<AdminCategory>(`/admin/categories/${id}`);

export const createAdminCategory = async (input: CreateCategoryInput): Promise<AdminCategory> =>
  api.post<AdminCategory>("/admin/categories", input);

export const updateAdminCategory = async (
  id: string,
  input: CreateCategoryInput,
): Promise<AdminCategory> => api.put<AdminCategory>(`/admin/categories/${id}`, input);

export const deleteAdminCategory = async (id: string): Promise<void> =>
  api.delete(`/admin/categories/${id}`);

// Users
export const getAdminUsers = async (): Promise<AdminUser[]> => api.get<AdminUser[]>("/admin/users");

export const getAdminUser = async (id: string): Promise<AdminUser> =>
  api.get<AdminUser>(`/admin/users/${id}`);

export const updateAdminUser = async (id: string, input: UpdateUserInput): Promise<AdminUser> =>
  api.put<AdminUser>(`/admin/users/${id}`, input);

// Payments
export const getAdminPayments = async (): Promise<AdminPayment[]> =>
  api.get<AdminPayment[]>("/admin/payments");

export const getAdminPayment = async (id: string): Promise<AdminPayment> =>
  api.get<AdminPayment>(`/admin/payments/${id}`);
