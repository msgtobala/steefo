import { CircuitFlow } from '../../components/common'

/**
 * Isolated preview of the circuit overlay (1710×250) with looping dashes.
 * Visit /svg-test — no site chrome, so the paths are easy to inspect.
 */
export function SvgTestPage() {
  return (
    <div className="min-h-svh font-display text-sm">
      <header className="border-b border-black/10 px-6 py-4">
        <p className="text-xs tracking-wide uppercase text-black/50">SVG test</p>
        <h1 className="mt-1 text-lg font-medium">Circuit overlay — looping dash</h1>
        <p className="mt-1 text-black/60">
          Same traces as the footer. The short dash travels each path and repeats.
        </p>
      </header>

      <section className="bg-white px-6 py-10">
        <p className="mb-4 text-xs uppercase tracking-wide text-black/40">On white</p>
        <div className="h-[250px] w-full">
          <CircuitFlow pulse="#525252" />
        </div>
      </section>

      <section className="bg-[#111] px-6 py-10">
        <p className="mb-4 text-xs uppercase tracking-wide text-white/40">On dark</p>
        <div className="h-[250px] w-full">
          <CircuitFlow />
        </div>
      </section>
    </div>
  )
}
