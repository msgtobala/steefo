/**
 * Shared a11y props for gray media placeholders (`bg-surface-placeholder`).
 */
export function mediaPlaceholderProps(ariaLabel: string) {
  return {
    role: 'img' as const,
    'aria-label': ariaLabel,
  }
}
