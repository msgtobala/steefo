import { forwardRef, type TextareaHTMLAttributes, useId } from 'react'
import { FieldShell, fieldControlClass, getDescribedBy, cn } from './field'

export type TextareaProps = Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  'className'
> & {
  label?: string
  error?: string
  hint?: string
  className?: string
  controlClassName?: string
}

/**
 * Underline textarea — Figma 14:3341
 * Same underline treatment as Input; grows for multi-line messages.
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea(
    {
      id: idProp,
      label,
      error,
      hint,
      className,
      controlClassName,
      disabled,
      rows = 3,
      ...rest
    },
    ref,
  ) {
    const generatedId = useId()
    const id = idProp ?? generatedId
    const describedBy = getDescribedBy(id, error, hint)

    return (
      <FieldShell
        id={id}
        label={label}
        error={error}
        hint={hint}
        className={className}
      >
        <textarea
          ref={ref}
          id={id}
          rows={rows}
          disabled={disabled}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={cn(
            fieldControlClass,
            'min-h-[72px] resize-y',
            controlClassName,
          )}
          {...rest}
        />
      </FieldShell>
    )
  },
)

Textarea.displayName = 'Textarea'
