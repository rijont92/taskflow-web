import { Link } from 'react-router-dom'

import { StatusBadge } from '@/components/ui/StatusBadge'
import { Alert } from '@/components/ui/Alert'
import { PageSpinner } from '@/components/ui/Spinner'
import { useAuth } from '@/features/auth/AuthContext'
import { useTasks } from '@/features/tasks/hooks'

export function DashboardPage() {
  const { user } = useAuth()
  const { data: tasks, isPending, isError } = useTasks()

  const total = tasks?.length ?? 0
  const pending = tasks?.filter((task) => task.status === 'pending').length ?? 0
  const inProgress =
    tasks?.filter((task) => task.status === 'in_progress').length ?? 0
  const done = tasks?.filter((task) => task.status === 'completed').length ?? 0
  const recent = tasks?.slice(-5).reverse() ?? []

  return (
    <div>
      <p className="text-sm text-muted">Welcome back</p>
      <h1 className="font-display mt-1 text-3xl text-ink">
        {user?.email.split('@')[0]}
      </h1>
      <p className="mt-2 max-w-xl text-sm text-muted">
        These numbers come from your tasks in the API. There is no separate
        statistics endpoint.
      </p>

      {isPending ? <PageSpinner label="Loading dashboard..." /> : null}
      {isError ? (
        <div className="mt-6">
          <Alert>Unable to load tasks.</Alert>
        </div>
      ) : null}

      {!isPending && !isError ? (
        <>
          <section className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard label="Total" value={total} />
            <StatCard label="To do" value={pending} />
            <StatCard label="In progress" value={inProgress} />
            <StatCard label="Done" value={done} />
          </section>

          <section className="mt-10">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl">Recent tasks</h2>
              <Link to="/tasks" className="text-sm text-pine hover:underline">
                View all
              </Link>
            </div>
            {recent.length === 0 ? (
              <p className="mt-4 rounded-lg border border-dashed border-line bg-surface px-4 py-8 text-sm text-muted">
                No tasks yet. Create your first one from the Tasks page.
              </p>
            ) : (
              <ul className="mt-4 divide-y divide-line rounded-lg border border-line bg-surface">
                {recent.map((task) => (
                  <li key={task.id} className="flex items-center justify-between gap-3 px-4 py-3">
                    <Link
                      to={`/tasks/${task.id}`}
                      className="min-w-0 truncate font-medium hover:underline"
                    >
                      {task.title}
                    </Link>
                    <StatusBadge status={task.status} />
                  </li>
                ))}
              </ul>
            )}
          </section>
        </>
      ) : null}
    </div>
  )
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <article className="rounded-lg border border-line bg-surface px-4 py-5">
      <p className="text-sm text-muted">{label}</p>
      <p className="mt-2 font-display text-3xl">{value}</p>
    </article>
  )
}
