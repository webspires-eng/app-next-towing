import Image from 'next/image';

const milestones = [
  { year: '2008', detail: 'Founded with a single flatbed and a commitment to honest pricing.' },
  { year: '2014', detail: 'Expanded to a five-truck fleet with 24/7 motorway coverage.' },
  { year: '2021', detail: 'Launched EV-ready recovery units and digital job tracking.' },
];

export default function About() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 lg:grid-cols-[1.15fr_0.85fr] xl:px-0">
        <div className="space-y-6">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">About Next Towing</p>
          <h2 className="text-balance text-4xl font-semibold text-slate-900">
            Local family business with national backup and modern recovery tech
          </h2>
          <p className="text-base text-slate-600">
            We have been keeping motorists moving for over a decade, combining family values with smart dispatch software,
            connected fleet monitoring, and an extended partner network for nationwide handovers.
          </p>

          <dl className="grid gap-6 sm:grid-cols-3">
            {milestones.map(({ year, detail }) => (
              <div key={year} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <dt className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">{year}</dt>
                <dd className="mt-3 text-sm text-slate-600">{detail}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative h-[420px] overflow-hidden rounded-[2.5rem] border border-slate-200">
          <Image
            src="/hero-recovery.jpeg"
            alt="Next Towing team preparing recovery trucks"
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 520px, 100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/10 to-transparent" />
          <div className="absolute bottom-6 left-6 rounded-2xl bg-white/90 p-4 shadow-lg">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">HQ Dispatch Centre</p>
            <p className="mt-2 text-sm font-semibold text-slate-900">Trafford Park • ISO 9001 compliant processes</p>
          </div>
        </div>
      </div>
    </section>
  );
}
