import type { TaskStatus } from '@/features/tasks/types'
import { cn } from '@/lib/cn'

const STATUS_LABELS: Record<TaskStatus, string> = {
  pending: 'To do',
  in_progress: 'In progress',
  completed: 'Done',
}

export function StatusBadge({ status }: { status: TaskStatus }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        status === 'pending' && 'bg-[#f3e6c8] text-[#7a5410]',
        status === 'in_progress' && 'bg-[#dce8f4] text-[#1e4d7b]',
        status === 'completed' && 'bg-pine/10 text-pine-dark',
      )}
    >
      {STATUS_LABELS[status]}
    </span>
  )
}
