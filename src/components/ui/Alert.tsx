export function Alert({ children }: { children: string }) {
  return (
    <div
      role="alert"
      className="rounded-md border border-clay/30 bg-clay/8 px-3 py-2 text-sm text-clay"
    >
      {children}
    </div>
  )
}
