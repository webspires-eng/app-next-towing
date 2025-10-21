import { Clock, CheckCircle2, Phone } from 'lucide-react';

const milestones = [
  {
    title: 'Answer within 30 seconds',
    description: 'Speak to a human dispatcher immediately — no automated menus.',
  },
  {
    title: 'Crew assigned in 5 minutes',
    description: 'We lock in the nearest specialist and confirm ETA by text and email.',
  },
  {
    title: 'Arrival within 60 minutes',
    description: 'Average arrival inside the M60 — we keep you updated every 10 minutes.',
  },
];

export default function ResponseGuarantee() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto w-full max-w-6xl px-6 xl:px-0">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Response guarantee</p>
          <h2 className="mt-3 text-balance text-4xl font-semibold text-slate-900">Our promise from the moment you call</h2>
          <p className="mt-4 text-base text-slate-600">
            Every dispatch is monitored by senior controllers with escalation routes if traffic or incidents change the plan.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {milestones.map(({ title, description }, index) => (
            <div key={title} className="relative rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <div className="absolute -top-4 left-6 inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-white">
                {index === 0 ? <Phone className="h-4 w-4" aria-hidden /> : index === 1 ? <CheckCircle2 className="h-4 w-4" aria-hidden /> : <Clock className="h-4 w-4" aria-hidden />}
              </div>
              <p className="mt-6 text-lg font-semibold text-slate-900">{title}</p>
              <p className="mt-3 text-sm text-slate-600">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
