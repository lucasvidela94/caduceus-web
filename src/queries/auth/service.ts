import { api, clearToken, setToken } from "#/lib/api";
import type { AuthResponse, GoogleLoginParams, LoginParams, RegisterParams, User } from "./types";

export const register = async (params: RegisterParams): Promise<AuthResponse> => {
  const data = await api.post<AuthResponse>("/api/v1/auth/register", params);
  setToken(data.token);
  return data;
};

export const login = async (params: LoginParams): Promise<AuthResponse> => {
  const data = await api.post<AuthResponse>("/api/v1/auth/login", params);
  setToken(data.token);
  return data;
};

export const loginWithGoogle = async (params: GoogleLoginParams): Promise<AuthResponse> => {
  const data = await api.post<AuthResponse>("/api/v1/auth/google", params);
  setToken(data.token);
  return data;
};

export const logout = async (): Promise<void> => {
  await api.delete("/api/v1/auth/logout");
  clearToken();
};

export const getSession = async (): Promise<User> => {
  return api.get<User>("/api/v1/auth/me");
};
