import { Navigate, Outlet } from 'react-router-dom'

import { AppShell } from '@/components/layout/AppShell'
import { PageSpinner } from '@/components/ui/Spinner'
import { useAuth } from '@/features/auth/AuthContext'

export function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return <PageSpinner label="Checking your session..." />
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return (
    <AppShell>
      <Outlet />
    </AppShell>
  )
}
