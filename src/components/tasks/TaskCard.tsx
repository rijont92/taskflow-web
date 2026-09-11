import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/Button'
import { StatusBadge } from '@/components/ui/StatusBadge'
import type { Task } from '@/features/tasks/types'

type TaskCardProps = {
  task: Task
  onEdit: (task: Task) => void
  onDelete: (task: Task) => void
}

export function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
  return (
    <article className="flex min-w-0 flex-col gap-3 rounded-lg border border-line bg-surface p-4">
      <div className="flex items-start justify-between gap-3">
        <h3 className="min-w-0 text-base font-medium break-words text-ink">
          {task.title}
        </h3>
        <StatusBadge status={task.status} />
      </div>
      <p className="line-clamp-2 text-sm text-muted">
        {task.description || 'No description'}
      </p>
      <div className="flex flex-wrap gap-2">
        <Link
          to={`/tasks/${task.id}`}
          className="inline-flex rounded-md border border-line px-3 py-1.5 text-sm text-ink hover:border-ink/20"
        >
          View
        </Link>
        <Button variant="secondary" size="sm" type="button" onClick={() => onEdit(task)}>
          Edit
        </Button>
        <Button variant="ghost" size="sm" type="button" onClick={() => onDelete(task)}>
          Delete
        </Button>
      </div>
    </article>
  )
}
