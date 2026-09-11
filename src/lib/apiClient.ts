import axios, { type InternalAxiosRequestConfig } from 'axios'

import { getToken, removeToken } from '@/lib/auth'
import { notifyUnauthorized } from '@/lib/authEvents'
import { queryClient } from '@/lib/queryClient'

const baseURL = import.meta.env.VITE_API_URL

if (!baseURL) {
  throw new Error('VITE_API_URL is not configured. Copy .env.example to .env.')
}

export const apiClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

apiClient.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status
      const url = error.config?.url ?? ''
      const isAuthEndpoint =
        url.includes('/auth/login') || url.includes('/auth/register')

      if (status === 401 && !isAuthEndpoint) {
        removeToken()
        queryClient.clear()
        notifyUnauthorized()
      }
    }

    return Promise.reject(error)
  },
)
