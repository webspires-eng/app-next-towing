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
    <section className="section-shell section-muted text-[#0E172B]">
      <div className="section-inner">
        <div className="section-heading">
          <div className="section-eyebrow border border-[#0E172B]/10 bg-[#0E172B]/5 text-[#0E172B]">Response guarantee</div>
          <h2 className="section-title text-[#0E172B]">Our promise from the moment you call</h2>
          <p className="section-description">
            Every dispatch is monitored by senior controllers with escalation routes if traffic or incidents change the plan.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {milestones.map(({ title, description }, index) => (
            <div key={title} className="relative rounded-3xl border border-[#0E172B]/10 bg-white p-6 shadow-[0_24px_60px_-45px_rgba(14,23,43,0.15)]">
              <div className="absolute -top-4 left-6 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#0E172B] text-white">
                {index === 0 ? <Phone className="h-4 w-4" aria-hidden /> : index === 1 ? <CheckCircle2 className="h-4 w-4" aria-hidden /> : <Clock className="h-4 w-4" aria-hidden />}
              </div>
              <p className="mt-6 text-lg font-semibold text-[#0E172B]">{title}</p>
              <p className="mt-3 text-sm text-[#0E172B]/70">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
