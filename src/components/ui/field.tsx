import type { ReactNode } from 'react'

/** Shared underline field styles — Figma Contact form inputs (14:3340–14:3342). */
export function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(' ')
}

export const fieldControlClass = cn(
  'w-full bg-transparent font-display text-sm font-light leading-[1.3]',
  'text-foreground placeholder:text-placeholder-faint',
  'border-0 border-b border-foreground rounded-none',
  'px-0 pb-2 pt-0',
  'outline-none transition-colors',
  'focus-visible:border-brand',
  'disabled:cursor-not-allowed disabled:opacity-50',
  'aria-invalid:border-brand',
)

export type FieldOption = {
  value: string
  label: string
  disabled?: boolean
}

export type FieldShellProps = {
  id?: string
  label?: string
  error?: string
  hint?: string
  className?: string
  children: ReactNode
}

/**
 * Optional label / error / hint wrapper shared by Input, Textarea, Select.
 */
export function FieldShell({
  id,
  label,
  error,
  hint,
  className,
  children,
}: FieldShellProps) {
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined

  return (
    <div className={cn('flex w-full flex-col gap-1.5', className)}>
      {label ? (
        <label
          htmlFor={id}
          className="font-display text-sm font-medium leading-[1.3] text-foreground"
        >
          {label}
        </label>
      ) : null}
      {children}
      {error ? (
        <p
          id={describedBy}
          role="alert"
          className="font-display text-xs font-normal text-brand"
        >
          {error}
        </p>
      ) : hint ? (
        <p
          id={describedBy}
          className="font-display text-xs font-normal text-subtle-foreground"
        >
          {hint}
        </p>
      ) : null}
    </div>
  )
}

export function getDescribedBy(
  id: string | undefined,
  error?: string,
  hint?: string,
) {
  if (!id) return undefined
  if (error) return `${id}-error`
  if (hint) return `${id}-hint`
  return undefined
}
