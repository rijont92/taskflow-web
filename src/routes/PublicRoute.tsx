import { Navigate, Outlet } from 'react-router-dom'

import { PageSpinner } from '@/components/ui/Spinner'
import { useAuth } from '@/features/auth/AuthContext'

export function PublicRoute() {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return <PageSpinner label="Loading..." />
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  return <Outlet />
}
