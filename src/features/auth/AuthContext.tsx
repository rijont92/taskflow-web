import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

/* eslint-disable react-refresh/only-export-components */

import { getCurrentUser, loginUser, registerUser } from '@/features/auth/api'
import type { User } from '@/features/auth/types'
import { getToken, removeToken, setToken } from '@/lib/auth'
import { onUnauthorized } from '@/lib/authEvents'
import { queryClient } from '@/lib/queryClient'

type AuthContextValue = {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(() => Boolean(getToken()))

  const logout = useCallback(() => {
    removeToken()
    setUser(null)
    queryClient.clear()
  }, [])

  useEffect(() => {
    return onUnauthorized(() => {
      setUser(null)
    })
  }, [])

  useEffect(() => {
    const token = getToken()
    if (!token) {
      setIsLoading(false)
      return
    }

    let cancelled = false

    getCurrentUser()
      .then((currentUser) => {
        if (!cancelled) {
          setUser(currentUser)
        }
      })
      .catch(() => {
        if (!cancelled) {
          logout()
        }
      })
      .finally(() => {
        if (!cancelled) {
          setIsLoading(false)
        }
      })

    return () => {
      cancelled = true
    }
  }, [logout])

  const login = useCallback(async (email: string, password: string) => {
    const token = await loginUser({ email, password })
    setToken(token.access_token)
    const currentUser = await getCurrentUser()
    setUser(currentUser)
  }, [])

  const register = useCallback(
    async (email: string, password: string) => {
      await registerUser({ email, password })
      await login(email, password)
    },
    [login],
  )

  const value = useMemo(
    () => ({
      user,
      isLoading,
      isAuthenticated: Boolean(user),
      login,
      register,
      logout,
    }),
    [user, isLoading, login, register, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
