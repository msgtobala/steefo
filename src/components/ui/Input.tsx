import { forwardRef, type InputHTMLAttributes, useId } from 'react'
import { cn } from '../../utils'
import { FieldShell, fieldControlClass, getDescribedBy } from './field'

export type InputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'className'
> & {
  label?: string
  error?: string
  hint?: string
  className?: string
  controlClassName?: string
}

/**
 * Underline text input — Figma 14:3340
 * Space Grotesk Light 14px placeholder, black bottom rule.
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  function Input(
    {
      id: idProp,
      label,
      error,
      hint,
      className,
      controlClassName,
      disabled,
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
        <input
          ref={ref}
          id={id}
          disabled={disabled}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={cn(fieldControlClass, controlClassName)}
          {...rest}
        />
      </FieldShell>
    )
  },
)

Input.displayName = 'Input'
