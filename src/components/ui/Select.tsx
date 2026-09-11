import type { SelectHTMLAttributes } from 'react'

import { cn } from '@/lib/cn'

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string
  error?: string
}

export function Select({
  label,
  error,
  id,
  className,
  children,
  ...props
}: SelectProps) {
  const inputId = id ?? props.name

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={inputId} className="text-sm font-medium text-ink">
        {label}
      </label>
      <select
        id={inputId}
        className={cn(
          'rounded-md border bg-surface px-3 py-2.5 text-sm text-ink focus:border-pine focus:outline-none',
          error ? 'border-clay' : 'border-line',
          className,
        )}
        aria-invalid={Boolean(error)}
        {...props}
      >
        {children}
      </select>
      {error ? <p className="text-sm text-clay">{error}</p> : null}
    </div>
  )
}
