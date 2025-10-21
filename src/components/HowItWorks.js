import { MapPin, Clock, Wrench } from 'lucide-react';

const STEPS = [
  {
    n: 1,
    title: 'Tell us where you are',
    sub: 'Drop a pin, postcode, or nearby landmark so we can find you fast.',
    Icon: MapPin,
  },
  {
    n: 2,
    title: 'We dispatch a driver',
    sub: 'Track ETA updates while our insured recovery team heads your way.',
    Icon: Clock,
  },
  {
    n: 3,
    title: 'On-site fix or tow',
    sub: 'We attempt a roadside fix first—otherwise we load and tow safely.',
    Icon: Wrench,
  },
];

export default function HowItWorks() {
  return (
    <section className="flex justify-center bg-black py-16 md:py-24">
      <div className="container-1300 w-full px-4">
        <header className="mx-auto mb-12 max-w-2xl text-center">
          <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-yellow-400/40 bg-yellow-400/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-yellow-400">
            Fast &amp; Reliable
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            How It Works
          </h2>
          <p className="mt-4 text-base text-white/70 md:text-lg">
            A simple three-step journey to get you moving again&mdash;day or night.
          </p>
        </header>

        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-neutral-900/80 via-neutral-900/60 to-neutral-950/90 p-8 shadow-[0_28px_80px_rgba(0,0,0,0.5)] md:p-12">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent" aria-hidden="true" />
          <div className="grid gap-8 md:grid-cols-3">
            {STEPS.map(({ n, title, sub, Icon }) => (
              <div key={n} className="relative flex flex-col items-center text-center md:items-start md:text-left">
                <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full border border-yellow-400/50 bg-yellow-400/15 font-semibold text-yellow-400">
                  {n}
                </div>
                <div className="mb-4 inline-flex items-center gap-2 text-yellow-400/90">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-yellow-400/70">Step {n}</span>
                </div>
                <h3 className="text-xl font-semibold text-white">{title}</h3>
                <p className="mt-2 text-white/70">{sub}</p>
                {n !== STEPS.length && (
                  <span className="mt-6 hidden w-full border-t border-dashed border-white/10 md:block" aria-hidden="true" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
