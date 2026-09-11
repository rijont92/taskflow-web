import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react'

import { cn } from '@/lib/cn'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  error?: string
}

export function Input({ label, error, id, className, ...props }: InputProps) {
  const inputId = id ?? props.name

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={inputId} className="text-sm font-medium text-ink">
        {label}
      </label>
      <input
        id={inputId}
        className={cn(
          'rounded-md border bg-surface px-3 py-2.5 text-sm text-ink placeholder:text-muted/70 focus:border-pine focus:outline-none',
          error ? 'border-clay' : 'border-line',
          className,
        )}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${inputId}-error` : undefined}
        {...props}
      />
      {error ? (
        <p id={`${inputId}-error`} className="text-sm text-clay">
          {error}
        </p>
      ) : null}
    </div>
  )
}

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string
  error?: string
}

export function TextArea({
  label,
  error,
  id,
  className,
  ...props
}: TextAreaProps) {
  const inputId = id ?? props.name

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={inputId} className="text-sm font-medium text-ink">
        {label}
      </label>
      <textarea
        id={inputId}
        className={cn(
          'min-h-28 rounded-md border bg-surface px-3 py-2.5 text-sm text-ink placeholder:text-muted/70 focus:border-pine focus:outline-none',
          error ? 'border-clay' : 'border-line',
          className,
        )}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${inputId}-error` : undefined}
        {...props}
      />
      {error ? (
        <p id={`${inputId}-error`} className="text-sm text-clay">
          {error}
        </p>
      ) : null}
    </div>
  )
}
