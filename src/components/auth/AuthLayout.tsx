import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

export function AuthLayout({
  title,
  subtitle,
  children,
}: {
  title: string
  subtitle: string
  children: ReactNode
}) {
  return (
    <div className="grid min-h-screen lg:grid-cols-[1.1fr_0.9fr]">
      <aside className="hidden flex-col justify-between bg-pine px-12 py-10 text-paper lg:flex">
        <Link to="/" className="font-display text-2xl tracking-tight">
          TaskFlow
        </Link>
        <div className="max-w-md">
          <p className="font-display text-4xl leading-tight">
            A quiet place for work that actually gets finished.
          </p>
          <p className="mt-5 text-sm leading-6 text-paper/80">
            Sign in to manage your own tasks. Nothing is shared, and the API
            decides ownership from your session — never from a user id in the
            form.
          </p>
        </div>
        <p className="text-sm text-paper/60">TaskFlow · personal workspace</p>
      </aside>
      <main className="flex items-center justify-center px-5 py-10">
        <div className="w-full max-w-md">
          <Link
            to="/"
            className="mb-8 inline-block font-display text-2xl text-ink lg:hidden"
          >
            TaskFlow
          </Link>
          <h1 className="font-display text-3xl text-ink">{title}</h1>
          <p className="mt-2 mb-8 text-sm text-muted">{subtitle}</p>
          {children}
        </div>
      </main>
    </div>
  )
}
