import type { TaskStatus } from '@/features/tasks/types'
import { cn } from '@/lib/cn'

type TaskFiltersProps = {
  query: string
  status: TaskStatus | 'all'
  onQueryChange: (value: string) => void
  onStatusChange: (value: TaskStatus | 'all') => void
}

const filters: Array<{ value: TaskStatus | 'all'; label: string }> = [
  { value: 'all', label: 'All' },
  { value: 'pending', label: 'To do' },
  { value: 'in_progress', label: 'In progress' },
  { value: 'completed', label: 'Done' },
]

export function TaskFilters({
  query,
  status,
  onQueryChange,
  onStatusChange,
}: TaskFiltersProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div className="flex flex-col gap-1.5 sm:max-w-xs sm:flex-1">
        <label htmlFor="task-search" className="text-sm font-medium">
          Search
        </label>
        <input
          id="task-search"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Search by title"
          className="rounded-md border border-line bg-surface px-3 py-2.5 text-sm focus:border-pine focus:outline-none"
        />
      </div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by status">
        {filters.map((filter) => (
          <button
            key={filter.value}
            type="button"
            onClick={() => onStatusChange(filter.value)}
            className={cn(
              'rounded-full border px-3 py-1.5 text-sm',
              status === filter.value
                ? 'border-pine bg-pine text-paper'
                : 'border-line bg-surface text-muted hover:text-ink',
            )}
          >
            {filter.label}
          </button>
        ))}
      </div>
    </div>
  )
}
