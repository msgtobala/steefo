import { uiConstants } from '../constants/ui_constants'

export type MailtoOptions = {
  subject: string
  body: string
  /** Defaults to `uiConstants.contact.email`. */
  to?: string
}

/**
 * Build a `mailto:` URL with subject/body query params.
 */
export function buildMailto({
  subject,
  body,
  to = uiConstants.contact.email,
}: MailtoOptions): string {
  const params = new URLSearchParams({ subject, body })
  return `mailto:${to}?${params.toString()}`
}
