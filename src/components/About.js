import Image from 'next/image';

const milestones = [
  { year: '2008', detail: 'Founded with a single flatbed and a commitment to honest pricing.' },
  { year: '2014', detail: 'Expanded to a five-truck fleet with 24/7 motorway coverage.' },
  { year: '2021', detail: 'Launched EV-ready recovery units and digital job tracking.' },
];

export default function About() {
  return (
    <section className="section-shell section-muted text-[#0E172B]">
      <div className="section-inner grid gap-12 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="section-heading section-heading--left m-0">
          <div className="section-eyebrow border border-[#0E172B]/10 bg-[#0E172B]/5 text-[#0E172B]">About Next Towing</div>
          <h2 className="section-title text-[#0E172B]">
            Local family business with national backup and modern recovery tech
          </h2>
          <p className="section-description text-left text-[#0E172B]/70">
            We have been keeping motorists moving for over a decade, combining family values with smart dispatch software,
            connected fleet monitoring, and an extended partner network for nationwide handovers.
          </p>

          <dl className="mt-10 grid gap-6 sm:grid-cols-3">
            {milestones.map(({ year, detail }) => (
              <div key={year} className="rounded-2xl border border-[#0E172B]/10 bg-white p-5 shadow-[0_20px_40px_-40px_rgba(14,23,43,0.15)]">
                <dt className="text-sm font-semibold uppercase tracking-[0.25em] text-[#0E172B]">{year}</dt>
                <dd className="mt-3 text-sm text-[#0E172B]/70">{detail}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative h-[420px] overflow-hidden rounded-[2.5rem] border border-[#0E172B]/10 bg-[#0E172B]/5">
          <Image
            src="/hero-recovery.jpeg"
            alt="Next Towing team preparing recovery trucks"
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 520px, 100vw"
          />
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute bottom-6 left-6 rounded-2xl border border-white/40 bg-black/50 p-4 shadow-lg backdrop-blur">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">HQ Dispatch Centre</p>
            <p className="mt-2 text-sm font-semibold text-white">Trafford Park • ISO 9001 compliant processes</p>
          </div>
        </div>
      </div>
    </section>
  );
}
