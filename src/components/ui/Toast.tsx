import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'

import { cn } from '@/lib/cn'

/* eslint-disable react-refresh/only-export-components */

type Toast = {
  id: number
  message: string
  tone: 'success' | 'error'
}

type ToastContextValue = {
  notify: (message: string, tone?: Toast['tone']) => void
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined)

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const notify = useCallback((message: string, tone: Toast['tone'] = 'success') => {
    const id = Date.now() + Math.random()
    setToasts((current) => [...current, { id, message, tone }])
    window.setTimeout(() => {
      setToasts((current) => current.filter((toast) => toast.id !== id))
    }, 3200)
  }, [])

  const value = useMemo(() => ({ notify }), [notify])

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="pointer-events-none fixed right-4 bottom-4 z-50 flex w-[min(100%-2rem,22rem)] flex-col gap-2">
        {toasts.map((toast) => (
          <p
            key={toast.id}
            role="status"
            className={cn(
              'pointer-events-auto rounded-lg border px-4 py-3 text-sm shadow-sm',
              toast.tone === 'success'
                ? 'border-pine/20 bg-surface text-pine-dark'
                : 'border-clay/30 bg-surface text-clay',
            )}
          >
            {toast.message}
          </p>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast(): ToastContextValue {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within ToastProvider')
  }
  return context
}
