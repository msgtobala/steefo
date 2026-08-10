import type { ElementType, ReactNode } from 'react'

function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(' ')
}

export type ContainerProps = {
  as?: ElementType
  /** `content` = 1440/60 gutters; `header` = 1130 floating bar */
  variant?: 'content' | 'header'
  className?: string
  children?: ReactNode
}

/**
 * Shared horizontal layout wrapper aligned to Figma Home Page (2:45).
 */
export function Container({
  as: Comp = 'div',
  variant = 'content',
  className,
  children,
}: ContainerProps) {
  return (
    <Comp
      className={cn(
        variant === 'header' ? 'container-header' : 'container-content',
        className,
      )}
    >
      {children}
    </Comp>
  )
}
