import { useState, type ReactNode } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/Button'
import { useAuth } from '@/features/auth/AuthContext'
import { cn } from '@/lib/cn'

const links = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/tasks', label: 'Tasks' },
  { to: '/profile', label: 'Profile' },
]

export function AppShell({ children }: { children: ReactNode }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  function handleLogout() {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[15rem_1fr]">
      <header className="flex items-center justify-between border-b border-line bg-surface px-4 py-3 lg:hidden">
        <p className="font-display text-lg">TaskFlow</p>
        <Button
          variant="secondary"
          size="sm"
          type="button"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          Menu
        </Button>
      </header>

      <aside
        className={cn(
          'border-line bg-surface lg:flex lg:min-h-screen lg:flex-col lg:border-r',
          menuOpen ? 'block border-b' : 'hidden lg:flex',
        )}
      >
        <div className="flex h-full flex-col px-4 py-5">
          <p className="hidden font-display text-xl lg:block">TaskFlow</p>
          <nav className="mt-6 flex flex-col gap-1" aria-label="Main">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  cn(
                    'rounded-md px-3 py-2 text-sm',
                    isActive
                      ? 'bg-pine text-paper'
                      : 'text-muted hover:bg-ink/5 hover:text-ink',
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
          <div className="mt-auto border-t border-line pt-4">
            <p className="truncate px-3 text-sm text-ink">{user?.email}</p>
            <Button
              variant="ghost"
              className="mt-2 w-full justify-start"
              type="button"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        </div>
      </aside>

      <div className="min-w-0">
        <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
          {children}
        </div>
      </div>
    </div>
  )
}
