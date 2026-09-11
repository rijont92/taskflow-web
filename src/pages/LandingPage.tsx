import { Link, Navigate } from 'react-router-dom'

import { Button } from '@/components/ui/Button'
import { useAuth } from '@/features/auth/AuthContext'

export function LandingPage() {
  const { isAuthenticated, isLoading } = useAuth()

  if (!isLoading && isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center px-6">
      <p className="font-display text-2xl">TaskFlow</p>
      <h1 className="font-display mt-6 text-4xl leading-tight sm:text-5xl">
        Keep work in one place, without the noise.
      </h1>
      <p className="mt-4 max-w-xl text-muted">
        A small task manager backed by a FastAPI API. Your list is private to
        your account.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link to="/login">
          <Button type="button">Sign in</Button>
        </Link>
        <Link to="/register">
          <Button type="button" variant="secondary">
            Create account
          </Button>
        </Link>
      </div>
    </div>
  )
}
