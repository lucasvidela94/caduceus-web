export type User = {
  id: number
  name: string
  email: string
  role: 'student' | 'admin'
  tier: 'free' | 'plus'
}

export type AuthResponse = {
  token: string
  user: User
}

export type RegisterParams = {
  name: string
  email: string
  password: string
  password_confirmation: string
}

export type LoginParams = {
  email: string
  password: string
}
