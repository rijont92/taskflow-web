import { apiClient } from '@/lib/apiClient'
import type { LoginRequest, RegisterRequest, TokenResponse, User } from '@/types/api'

export async function registerUser(payload: RegisterRequest): Promise<User> {
  const response = await apiClient.post<User>('/auth/register', payload)
  return response.data
}

export async function loginUser(payload: LoginRequest): Promise<TokenResponse> {
  const response = await apiClient.post<TokenResponse>('/auth/login', payload)
  return response.data
}

export async function getCurrentUser(): Promise<User> {
  const response = await apiClient.get<User>('/users/me')
  return response.data
}
