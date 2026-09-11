import type { ButtonHTMLAttributes, ReactNode } from 'react'

import { cn } from '@/lib/cn'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md'
  children: ReactNode
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pine disabled:cursor-not-allowed disabled:opacity-60',
        size === 'sm' ? 'px-3 py-1.5 text-sm' : 'px-4 py-2.5 text-sm',
        variant === 'primary' && 'bg-pine text-paper hover:bg-pine-dark',
        variant === 'secondary' &&
          'border border-line bg-surface text-ink hover:border-ink/20',
        variant === 'ghost' && 'text-muted hover:bg-ink/5 hover:text-ink',
        variant === 'danger' && 'bg-clay text-paper hover:bg-clay/90',
        className,
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}
