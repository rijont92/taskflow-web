import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { useAuth } from '@/features/auth/AuthContext'
import { onUnauthorized } from '@/lib/authEvents'

export function UnauthorizedRedirect() {
  const navigate = useNavigate()
  const location = useLocation()
  const { logout } = useAuth()

  useEffect(() => {
    return onUnauthorized(() => {
      logout()
      if (location.pathname !== '/login' && location.pathname !== '/register') {
        navigate('/login', { replace: true })
      }
    })
  }, [logout, navigate, location.pathname])

  return null
}
