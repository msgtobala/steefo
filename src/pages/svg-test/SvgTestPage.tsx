import { CircuitFlow } from '../../components/common'
import { images } from '../../resources/images'

/**
 * Preview of traveling dashes on the existing footer circuit mesh.
 * Visit /svg-test — no site chrome.
 */
export function SvgTestPage() {
  return (
    <div className="min-h-svh font-display text-sm">
      <header className="border-b border-black/10 px-6 py-4">
        <p className="text-xs tracking-wide uppercase text-black/50">SVG test</p>
        <h1 className="mt-1 text-lg font-medium">Footer circuit — looping dash</h1>
        <p className="mt-1 text-black/60">
          Existing `pattern.png` mesh with pulses traveling the same orthogonal paths.
        </p>
      </header>

      <section className="relative h-[647px] overflow-hidden bg-black">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${images.pattern})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center top',
            backgroundRepeat: 'no-repeat',
          }}
        />
        <div className="absolute inset-0">
          <CircuitFlow />
        </div>
      </section>
    </div>
  )
}
