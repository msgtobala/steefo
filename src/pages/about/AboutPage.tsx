import { Container } from '../../components/common'
import { aboutStrings } from '../../resources/about_strings'

export function AboutPage() {
  return (
    <Container className="page py-6 md:py-8">
      <h1>{aboutStrings.title}</h1>
      <p>{aboutStrings.description}</p>
    </Container>
  )
}
