import {
  forwardRef,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type Ref,
} from 'react'
import { cn } from '../../utils'
import {
  FieldShell,
  fieldControlClass,
  getDescribedBy,
  type FieldOption,
} from './field'

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M7 10l5 5 5-5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export type SelectProps = {
  id?: string
  name?: string
  label?: string
  error?: string
  hint?: string
  placeholder?: string
  options: FieldOption[]
  value?: string
  defaultValue?: string
  disabled?: boolean
  required?: boolean
  className?: string
  controlClassName?: string
  onChange?: (value: string) => void
}

/**
 * Custom underline dropdown — Figma 14:3342
 * Matches Input field language; list panel uses site surface/typography (not native OS menu).
 */
export const Select = forwardRef<HTMLButtonElement, SelectProps>(
  function Select(
    {
      id: idProp,
      name,
      label,
      error,
      hint,
      placeholder,
      options,
      value,
      defaultValue = '',
      disabled,
      required,
      className,
      controlClassName,
      onChange,
    },
    ref,
  ) {
    const generatedId = useId()
    const id = idProp ?? generatedId
    const listboxId = `${id}-listbox`
    const describedBy = getDescribedBy(id, error, hint)
    const rootRef = useRef<HTMLDivElement>(null)
    const [open, setOpen] = useState(false)
    const isControlled = value !== undefined
    const [uncontrolledValue, setUncontrolledValue] = useState(
      String(defaultValue),
    )
    const current = isControlled ? String(value) : uncontrolledValue
    const selected = options.find((option) => option.value === current)
    const isPlaceholder = !selected

    const setValue = (next: string) => {
      if (!isControlled) setUncontrolledValue(next)
      onChange?.(next)
    }

    const close = () => setOpen(false)

    useEffect(() => {
      if (!open) return

      const onPointerDown = (event: MouseEvent) => {
        if (!rootRef.current?.contains(event.target as Node)) close()
      }

      const onKeyDown = (event: globalThis.KeyboardEvent) => {
        if (event.key === 'Escape') close()
      }

      document.addEventListener('mousedown', onPointerDown)
      document.addEventListener('keydown', onKeyDown)
      return () => {
        document.removeEventListener('mousedown', onPointerDown)
        document.removeEventListener('keydown', onKeyDown)
      }
    }, [open])

    const moveHighlight = (direction: 1 | -1) => {
      const enabled = options.filter((option) => !option.disabled)
      if (enabled.length === 0) return
      const index = enabled.findIndex((option) => option.value === current)
      const nextIndex =
        index === -1
          ? direction === 1
            ? 0
            : enabled.length - 1
          : (index + direction + enabled.length) % enabled.length
      setValue(enabled[nextIndex].value)
    }

    const onTriggerKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
      if (disabled) return

      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault()
          if (!open) setOpen(true)
          else moveHighlight(1)
          break
        case 'ArrowUp':
          event.preventDefault()
          if (!open) setOpen(true)
          else moveHighlight(-1)
          break
        case 'Enter':
        case ' ':
          event.preventDefault()
          setOpen((wasOpen) => !wasOpen)
          break
        case 'Escape':
          if (open) {
            event.preventDefault()
            close()
          }
          break
        default:
          break
      }
    }

    const assignRef = (node: HTMLButtonElement | null) => {
      if (typeof ref === 'function') ref(node)
      else if (ref) (ref as { current: HTMLButtonElement | null }).current = node
    }

    return (
      <FieldShell
        id={id}
        label={label}
        error={error}
        hint={hint}
        className={className}
      >
        <div ref={rootRef} className="relative w-full">
          {name ? (
            <input
              type="hidden"
              name={name}
              value={current}
              required={required}
            />
          ) : null}

          <button
            ref={assignRef as Ref<HTMLButtonElement>}
            id={id}
            type="button"
            disabled={disabled}
            aria-haspopup="listbox"
            aria-expanded={open}
            aria-controls={listboxId}
            aria-invalid={error ? true : undefined}
            aria-describedby={describedBy}
            onClick={() => !disabled && setOpen((wasOpen) => !wasOpen)}
            onKeyDown={onTriggerKeyDown}
            className={cn(
              fieldControlClass,
              'flex items-center justify-between gap-2 pr-0 text-left',
              isPlaceholder && 'text-placeholder-faint',
              open && 'border-brand',
              controlClassName,
            )}
          >
            <span className="min-w-0 truncate">
              {selected?.label ?? placeholder ?? ''}
            </span>
            <ChevronDownIcon
              className={cn(
                'size-6 shrink-0 text-foreground transition-transform',
                open && 'rotate-180',
              )}
            />
          </button>

          {open ? (
            <ul
              id={listboxId}
              role="listbox"
              aria-labelledby={id}
              className={cn(
                'absolute inset-x-0 top-[calc(100%+4px)] z-30',
                'max-h-60 overflow-auto bg-surface py-1',
                'border border-border shadow-elevated',
              )}
            >
              {options.map((option) => {
                const isSelected = option.value === current
                return (
                  <li key={option.value} role="presentation">
                    <button
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      disabled={option.disabled}
                      className={cn(
                        'flex w-full items-center px-3 py-2.5 text-left',
                        'font-display text-sm font-light leading-[1.3]',
                        'transition-colors',
                        'hover:bg-surface-muted focus-visible:bg-surface-muted focus-visible:outline-none',
                        isSelected
                          ? 'text-brand'
                          : 'text-foreground',
                        option.disabled && 'cursor-not-allowed opacity-50',
                      )}
                      onClick={() => {
                        if (option.disabled) return
                        setValue(option.value)
                        close()
                      }}
                    >
                      {option.label}
                    </button>
                  </li>
                )
              })}
            </ul>
          ) : null}
        </div>
      </FieldShell>
    )
  },
)

Select.displayName = 'Select'

/** Alias matching the Figma naming. */
export const Dropdown = Select
