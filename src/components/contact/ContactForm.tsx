import { type FormEvent } from 'react'
import {
  Button,
  Input,
  Select,
  Textarea,
  type FieldOption,
} from '../ui'
import { uiConstants } from '../../constants/ui_constants'
import { contactStrings } from '../../resources/contact_strings'

export type ContactFormProps = {
  projectTypeOptions: FieldOption[]
}

function buildMailto(form: HTMLFormElement, projectTypeOptions: FieldOption[]) {
  const data = new FormData(form)
  const fullName = String(data.get('fullName') ?? '').trim()
  const email = String(data.get('email') ?? '').trim()
  const phone = String(data.get('phone') ?? '').trim()
  const company = String(data.get('company') ?? '').trim()
  const projectType = String(data.get('projectType') ?? '').trim()
  const message = String(data.get('message') ?? '').trim()

  const projectLabel =
    projectTypeOptions.find((option) => option.value === projectType)?.label ??
    projectType

  const body = [
    `Full Name: ${fullName}`,
    `Email: ${email}`,
    `Phone: ${phone}`,
    `Company: ${company}`,
    `Project Type: ${projectLabel}`,
    '',
    'Message:',
    message,
  ].join('\n')

  const params = new URLSearchParams({
    subject: contactStrings.mailSubject,
    body,
  })

  return `mailto:${uiConstants.contact.email}?${params.toString()}`
}

/**
 * Contact inquiry form — Figma 1:3890
 * Uses shared underline Input / Select / Textarea + primary Button.
 */
export function ContactForm({ projectTypeOptions }: ContactFormProps) {
  const { fields, submit } = contactStrings

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    window.location.href = buildMailto(event.currentTarget, projectTypeOptions)
  }

  return (
    <form
      className="flex w-full flex-col gap-6"
      onSubmit={handleSubmit}
      noValidate
    >
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <Input
          name="fullName"
          placeholder={fields.fullName}
          autoComplete="name"
          required
        />
        <Input
          name="email"
          type="email"
          placeholder={fields.email}
          autoComplete="email"
          required
        />
        <Input
          name="phone"
          type="tel"
          placeholder={fields.phone}
          autoComplete="tel"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Input
          name="company"
          placeholder={fields.company}
          autoComplete="organization"
        />
        <Select
          name="projectType"
          placeholder={fields.projectType}
          options={projectTypeOptions}
          defaultValue=""
        />
      </div>

      <Textarea name="message" placeholder={fields.message} rows={3} required />

      <Button
        type="submit"
        variant="primary"
        size="sm"
        withArrow
        cutCorners="top-right"
        className="w-fit"
      >
        {submit}
      </Button>
    </form>
  )
}
