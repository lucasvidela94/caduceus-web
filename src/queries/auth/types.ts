export type User = {
  id: string;
  name: string;
  email: string;
  role: number; // 0 = student, 1 = admin
  tier: number; // 0 = free, 1 = plus
  avatar_url?: string;
};

export type AuthResponse = {
  token: string;
  user: User;
};

export type RegisterParams = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export type LoginParams = {
  email: string;
  password: string;
};

export type GoogleLoginParams = {
  id_token: string;
};
