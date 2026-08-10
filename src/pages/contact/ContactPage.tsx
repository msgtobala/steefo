import { Container, PageHero } from '../../components/common'
import { ContactForm } from '../../components/contact'
import { uiConstants } from '../../constants/ui_constants'
import { contactStrings } from '../../resources/contact_strings'
import { projectTypeOptions } from './projectTypes.config'
import { reachOutItems } from './reachOut.config'

/**
 * Contact Us page — Figma 1:3890
 * Hero + reach-out/office column + inquiry form.
 */
export function ContactPage() {
  const { contact } = uiConstants
  const officePhone = contact.phones[0]

  return (
    <div>
      <PageHero
        eyebrow={contactStrings.eyebrow}
        title={contactStrings.heroTitle}
      />

      <Container className="mt-10 md:mt-14">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,315px)_minmax(0,650px)] lg:justify-between lg:gap-16">
          {/* Left — reach out + office */}
          <aside className="flex flex-col gap-12 md:gap-14">
            <section>
              <p className="font-display text-xs font-normal uppercase leading-[1.1] text-subtle-foreground">
                {contactStrings.reachOutHeading}
              </p>
              <ul className="mt-5 flex flex-col">
                {reachOutItems.map((item) => (
                  <li
                    key={item.id}
                    className="border-b border-border py-3 font-display text-base leading-[1.3] text-body"
                  >
                    {item.label}
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <p className="font-display text-xs font-normal uppercase leading-[1.1] text-subtle-foreground">
                {contactStrings.officeHeading}
              </p>
              <div className="mt-5 font-display text-base leading-[1.3] text-body">
                {contact.officeAddressLines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
                <p className="mt-4">
                  {contactStrings.phoneLabel}{' '}
                  <a
                    href={`tel:${officePhone.replace(/-/g, '')}`}
                    className="transition-colors hover:text-brand"
                  >
                    {officePhone}
                  </a>
                </p>
                <p>
                  {contactStrings.emailLabel}{' '}
                  <a
                    href={`mailto:${contact.email}`}
                    className="transition-colors hover:text-brand"
                  >
                    {contact.email}
                  </a>
                </p>
              </div>
            </section>
          </aside>

          {/* Right — form */}
          <section className="min-w-0">
            <h2 className="font-display text-[clamp(1.75rem,4vw,2.5rem)] font-normal leading-none tracking-[-0.04em] text-foreground">
              {contactStrings.formHeading}
            </h2>
            <div className="mt-8 md:mt-10">
              <ContactForm projectTypeOptions={projectTypeOptions} />
            </div>
          </section>
        </div>
      </Container>
    </div>
  )
}
