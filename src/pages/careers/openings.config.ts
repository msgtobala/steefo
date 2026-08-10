import { uiConstants } from '../../constants/ui_constants'

export type CareerOpening = {
  id: string
  title: string
  location: string
  employmentType: string
  applyTo: string
}

const { contact } = uiConstants.routes

export const careerOpenings: CareerOpening[] = [
  {
    id: 'design-engineer-rolling-mills',
    title: 'Design Engineer — Rolling Mills',
    location: 'Ahmedabad',
    employmentType: 'Full-Time',
    applyTo: contact,
  },
  {
    id: 'project-manager-turnkey-solutions',
    title: 'Project Manager — Turnkey Solutions',
    location: 'Ahmedabad',
    employmentType: 'Full-Time',
    applyTo: contact,
  },
  {
    id: 'export-sales-executive',
    title: 'Export Sales Executive',
    location: 'Ahmedabad',
    employmentType: 'Full-Time',
    applyTo: contact,
  },
  {
    id: 'cnc-operator-manufacturing',
    title: 'CNC Operator — Manufacturing',
    location: 'Ahmedabad',
    employmentType: 'Full-Time',
    applyTo: contact,
  },
]
