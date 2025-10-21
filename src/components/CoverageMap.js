import { MapPinned, Signal } from 'lucide-react';

export default function CoverageMap() {
  return (
    <section className="bg-slate-950 py-20 text-white">
      <div className="mx-auto w-full max-w-6xl px-6 xl:px-0">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl space-y-6">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-300">Coverage map</p>
            <h2 className="text-balance text-4xl font-semibold">Live dispatch heat map & ETA windows</h2>
            <p className="text-base text-slate-300">
              Real-time telemetry keeps our controllers aware of every unit&apos;s status so the closest crew reaches you first.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/10 px-6 py-4 text-sm text-slate-200 backdrop-blur">
            <p className="font-semibold text-white">Current response ETA</p>
            <p>M60 / City centre 25 mins • South Manchester 32 mins • Cheshire 45 mins</p>
          </div>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="relative h-[420px] overflow-hidden rounded-[2.5rem] border border-white/10 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.35),_rgba(15,23,42,0.9))]">
            <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(14,165,233,0.25)_0%,_rgba(2,6,23,0.95)_75%)] opacity-70" />
            <div className="absolute inset-6 rounded-[2rem] border border-white/20" />
            <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
              <MapPinned className="h-12 w-12 text-amber-300" aria-hidden />
              <span className="mt-3 text-sm font-semibold uppercase tracking-[0.3em] text-amber-200">Manchester HQ</span>
            </div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm">
            <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Coverage snapshot</p>
            <ul className="mt-4 space-y-3 text-slate-200">
              <li className="flex items-center gap-3">
                <Signal className="h-4 w-4 text-emerald-300" aria-hidden />
                12 units active within 20 miles
              </li>
              <li className="flex items-center gap-3">
                <Signal className="h-4 w-4 text-amber-300" aria-hidden />
                4 units on return trips
              </li>
              <li className="flex items-center gap-3">
                <Signal className="h-4 w-4 text-rose-300" aria-hidden />
                2 units assigned to motorway assistance
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
