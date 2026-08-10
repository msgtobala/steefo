import { Container } from '../../components/common'
import { homeStrings } from '../../resources/home_strings'

export function HomePage() {
  return (
    <Container className="page py-6 md:py-8">
      <h1>{homeStrings.title}</h1>
      <p>{homeStrings.description}</p>
    </Container>
  )
}
