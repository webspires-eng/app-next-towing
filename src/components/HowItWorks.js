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
    <section className="section-shell section-muted text-[#0E172B]">
      <div className="section-inner">
        <header className="section-heading">
          <span className="section-eyebrow border border-[#0E172B]/10 bg-[#0E172B]/5 text-[#0E172B]">
            Fast &amp; reliable
          </span>
          <h2 className="section-title text-[#0E172B]">How it works</h2>
          <p className="section-description">
            A simple three-step journey to get you moving again&mdash;day or night.
          </p>
        </header>

        <div className="relative overflow-hidden rounded-3xl border border-[#0E172B]/10 bg-white p-8 shadow-[0_28px_80px_-50px_rgba(14,23,43,0.18)] md:p-12">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#FACC14] to-transparent" aria-hidden="true" />
          <div className="grid gap-8 md:grid-cols-3">
            {STEPS.map(({ n, title, sub, Icon }) => (
              <div key={n} className="relative flex flex-col items-center text-center md:items-start md:text-left">
                <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full border border-[#FACC14] bg-[#FACC14]/15 font-semibold text-[#0E172B]">
                  {n}
                </div>
                <div className="mb-4 inline-flex items-center gap-2 text-[#0E172B]">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0E172B]/70">Step {n}</span>
                </div>
                <h3 className="text-xl font-semibold text-[#0E172B]">{title}</h3>
                <p className="mt-2 text-[#0E172B]/70">{sub}</p>
                {n !== STEPS.length && (
                  <span className="mt-6 hidden w-full border-t border-dashed border-[#0E172B]/15 md:block" aria-hidden="true" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
