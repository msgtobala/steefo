import {
  forwardRef,
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type ReactNode,
  type Ref,
} from 'react'
import { Link } from 'react-router-dom'
import {
  getButtonClipPath,
  getInnerCutSize,
  normalizeCorners,
  type ButtonCorner,
} from './button-clip'

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary'

type ButtonCutCorners = ButtonCorner | ButtonCorner[] | 'none'

type CommonButtonProps = {
  variant?: ButtonVariant
  /** `sm` matches the 126×40 header CTA; `md` is the default page CTA. */
  size?: 'sm' | 'md'
  /**
   * Which corner(s) receive the diagonal cutout.
   * Defaults follow Figma: primary/tertiary → top-right, secondary → bottom-left.
   * Pass `"none"` for a full rectangle.
   */
  cutCorners?: ButtonCutCorners
  /** Size of each corner cut in pixels. Figma Subtract ≈ 10px on 40px-tall CTAs. */
  cutSize?: number
  /** Shows the trailing arrow used on tertiary CTAs in Figma. Defaults to true for tertiary. */
  withArrow?: boolean
  startIcon?: ReactNode
  endIcon?: ReactNode
  className?: string
  children?: ReactNode
}

type ButtonAsButton = CommonButtonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'> & {
    to?: undefined
  }

type ButtonAsLink = CommonButtonProps &
  Omit<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    'className' | 'children' | 'href'
  > & {
    to: string
  }

export type ButtonProps = ButtonAsButton | ButtonAsLink

const VARIANT_DEFAULT_CORNERS: Record<ButtonVariant, ButtonCorner[]> = {
  primary: ['top-right'],
  secondary: ['bottom-left'],
  tertiary: ['top-right'],
}

function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(' ')
}

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M4.167 10h11.666M10.833 5l5 5-5 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const controlBaseClass = cn(
  'inline-flex items-center justify-center gap-1.5',
  'text-button font-medium whitespace-nowrap',
  'transition-colors duration-150',
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand',
  'disabled:pointer-events-none disabled:opacity-50',
  'cursor-pointer border-0',
)

const sizeClass = {
  sm: 'h-10 gap-0 px-5 py-0 font-display text-[12px] font-normal',
  md: 'px-7 py-[11px]',
} as const

const variantClass: Record<ButtonVariant, { shell?: string; control: string }> =
  {
    primary: {
      control: cn(
        'bg-brand text-brand-foreground',
        'hover:bg-brand-hover',
        'active:bg-brand-hover',
      ),
    },
    secondary: {
      shell: 'bg-foreground',
      control: cn(
        'bg-surface text-foreground',
        'hover:bg-surface-muted',
        'active:bg-surface-subtle',
      ),
    },
    tertiary: {
      shell: 'bg-brand',
      control: cn(
        'bg-surface-dark text-surface-dark-foreground',
        'hover:bg-surface-dark-elevated',
        'active:bg-surface-dark-elevated',
      ),
    },
  }

export const Button = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(function Button(props, ref) {
  const {
    variant = 'primary',
    size = 'md',
    cutCorners,
    cutSize = 10,
    withArrow,
    startIcon,
    endIcon,
    className,
    children,
    ...rest
  } = props

  const corners = normalizeCorners(
    cutCorners,
    VARIANT_DEFAULT_CORNERS[variant],
  )
  const showArrow = withArrow ?? variant === 'tertiary'
  const styles = variantClass[variant]
  const hasBorderShell = variant === 'secondary' || variant === 'tertiary'
  const shellClipPath = getButtonClipPath(corners, cutSize)
  const controlClipPath = hasBorderShell
    ? getButtonClipPath(corners, getInnerCutSize(cutSize))
    : shellClipPath
  const isLink = 'to' in props && typeof props.to === 'string'

  const content = (
    <>
      {startIcon}
      {children}
      {endIcon}
      {showArrow && !endIcon ? (
        <ArrowRightIcon className="size-5 shrink-0" />
      ) : null}
    </>
  )

  const controlClass = cn(
    controlBaseClass,
    sizeClass[size],
    styles.control,
    hasBorderShell && 'w-full',
    !hasBorderShell && className,
  )

  let control: ReactNode

  if (isLink) {
    const { to, ...linkRest } = rest as ButtonAsLink
    control = (
      <Link
        ref={ref as Ref<HTMLAnchorElement>}
        to={to}
        className={controlClass}
        style={{ clipPath: controlClipPath }}
        {...linkRest}
      >
        {content}
      </Link>
    )
  } else {
    const buttonRest = rest as ButtonAsButton
    control = (
      <button
        ref={ref as Ref<HTMLButtonElement>}
        type={buttonRest.type ?? 'button'}
        className={controlClass}
        style={{ clipPath: controlClipPath }}
        {...buttonRest}
      >
        {content}
      </button>
    )
  }

  if (!hasBorderShell) return control

  return (
    <span
      className={cn('inline-flex p-px', styles.shell, className)}
      style={{ clipPath: shellClipPath }}
    >
      {control}
    </span>
  )
})

Button.displayName = 'Button'
