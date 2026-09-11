import { cn } from '@/lib/cn'

export function Spinner({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'inline-block size-4 animate-spin rounded-full border-2 border-current border-r-transparent',
        className,
      )}
      aria-hidden="true"
    />
  )
}

export function PageSpinner({ label }: { label: string }) {
  return (
    <div className="flex min-h-48 flex-col items-center justify-center gap-3 text-muted">
      <Spinner className="size-6" />
      <p className="text-sm">{label}</p>
    </div>
  )
}

export function TaskListSkeleton() {
  return (
    <div className="grid gap-3" aria-hidden="true">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="h-28 animate-pulse rounded-lg border border-line bg-surface"
        />
      ))}
    </div>
  )
}
