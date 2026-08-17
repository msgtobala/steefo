import { uiConstants } from '../../constants/ui_constants'
import { commonStrings } from '../../resources/common_strings'
import { icons } from '../../resources/icons'
import { cn } from '../../utils/cn'

export type WhatsAppFloatProps = {
  className?: string
}

/**
 * Fixed WhatsApp chat control on the page shell.
 * Opens WhatsApp Web Business (`web.whatsapp.com/send`) in a new tab.
 */
export function WhatsAppFloat({ className }: WhatsAppFloatProps) {
  const href = `${uiConstants.social.whatsapp}&text=${encodeURIComponent(
    commonStrings.footer.whatsappMessage,
  )}`

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={commonStrings.footer.whatsappAriaLabel}
      className={cn(
        'fixed right-5 bottom-5 z-40 flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_24px_rgba(37,211,102,0.45)] transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366] md:right-8 md:bottom-8',
        className,
      )}
    >
      <img
        src={icons.whatsapp}
        alt=""
        width={28}
        height={28}
        className="size-7 brightness-0 invert"
      />
    </a>
  )
}
