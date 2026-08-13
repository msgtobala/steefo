import type { ElementType, HTMLAttributes, ReactNode } from 'react'
import { cn } from '../../utils/cn'

export type ContainerProps = {
  as?: ElementType
  /** `content` = 1440/60 gutters; `header` = 1130 floating bar */
  variant?: 'content' | 'header'
  className?: string
  children?: ReactNode
} & Omit<HTMLAttributes<HTMLElement>, 'className' | 'children'>

/**
 * Shared horizontal layout wrapper aligned to Figma Home Page (2:45).
 */
export function Container({
  as: Comp = 'div',
  variant = 'content',
  className,
  children,
  ...rest
}: ContainerProps) {
  return (
    <Comp
      className={cn(
        variant === 'header' ? 'container-header' : 'container-content',
        className,
      )}
      {...rest}
    >
      {children}
    </Comp>
  )
}
