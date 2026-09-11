import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { AuthLayout } from '@/components/auth/AuthLayout'
import { Alert } from '@/components/ui/Alert'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useAuth } from '@/features/auth/AuthContext'
import { getApiErrorMessage } from '@/lib/errors'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function RegisterPage() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState<{
    email?: string
    password?: string
    confirmPassword?: string
  }>({})
  const [apiError, setApiError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  function validate() {
    const next: typeof errors = {}
    if (!email.trim()) {
      next.email = 'Email is required.'
    } else if (!emailPattern.test(email.trim())) {
      next.email = 'Enter a valid email address.'
    }
    if (!password) {
      next.password = 'Password is required.'
    } else if (password.length < 8) {
      next.password = 'Password must be at least 8 characters.'
    }
    if (confirmPassword !== password) {
      next.confirmPassword = 'Passwords must match.'
    }
    setErrors(next)
    return Object.keys(next).length === 0
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setApiError('')
    if (!validate() || isSubmitting) {
      return
    }

    setIsSubmitting(true)
    try {
      await register(email.trim(), password)
      navigate('/dashboard', { replace: true })
    } catch (error) {
      setApiError(getApiErrorMessage(error))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AuthLayout
      title="Create your workspace"
      subtitle="Register with an email. Your password is hashed on the server."
    >
      <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
        {apiError ? <Alert>{apiError}</Alert> : null}
        <Input
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          error={errors.email}
        />
        <Input
          label="Password"
          name="password"
          type="password"
          autoComplete="new-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          error={errors.password}
        />
        <Input
          label="Confirm password"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          error={errors.confirmPassword}
        />
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Creating account...' : 'Create account'}
        </Button>
      </form>
      <p className="mt-6 text-sm text-muted">
        Already have an account?{' '}
        <Link to="/login" className="font-medium text-pine hover:underline">
          Sign in
        </Link>
      </p>
    </AuthLayout>
  )
}
