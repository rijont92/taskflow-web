import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/Button'
import { useAuth } from '@/features/auth/AuthContext'

export function ProfilePage() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <div className="max-w-xl">
      <h1 className="font-display text-3xl">Profile</h1>
      <p className="mt-2 text-sm text-muted">
        This is the account returned by <code>GET /users/me</code>. The password
        hash is never sent to the browser.
      </p>
      <dl className="mt-8 divide-y divide-line rounded-lg border border-line bg-surface">
        <div className="px-4 py-3">
          <dt className="text-sm text-muted">Email</dt>
          <dd className="mt-1 font-medium">{user?.email}</dd>
        </div>
        <div className="px-4 py-3">
          <dt className="text-sm text-muted">User ID</dt>
          <dd className="mt-1 font-medium">{user?.id}</dd>
        </div>
      </dl>
      <Button className="mt-6" variant="secondary" type="button" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  )
}
