export type AdminQuestion = {
  id: string;
  category_id: string;
  body: string;
  options: Record<string, string>;
  correct_answer: string;
  explanation: string | null;
  tier: number;
  year: number | null;
  created_at: string;
  updated_at: string;
};

export type CreateQuestionInput = {
  categoryId: string;
  body: string;
  options: Record<string, string>;
  correctAnswer: string;
  explanation?: string | null;
  tier: number;
  year?: number | null;
};

export type AdminCategory = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  created_at: string;
  updated_at: string;
};

export type CreateCategoryInput = {
  name: string;
  slug: string;
  description?: string | null;
};

export type AdminUser = {
  id: string;
  name: string;
  email: string;
  role: number;
  tier: number;
  created_at: string;
  updated_at: string;
};

export type UpdateUserInput = {
  name: string;
  email: string;
  role: number;
  tier: number;
};

export type AdminPayment = {
  id: string;
  user_id: string;
  mp_preference_id: string | null;
  mp_payment_id: string | null;
  status: string;
  amount: number;
  created_at: string;
  updated_at: string;
};

export type AdminDashboardStats = {
  total_questions: number;
  total_categories: number;
  total_users: number;
  total_payments: number;
  total_revenue: number;
};
