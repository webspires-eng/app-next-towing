import { ShieldCheck, Award, Briefcase } from 'lucide-react';

const badges = [
  {
    icon: ShieldCheck,
    label: 'PAS43 Certified Safety',
    description: 'Audited recovery standards with annual compliance reviews.',
  },
  {
    icon: Award,
    label: '4.9/5 Customer Rating',
    description: 'Thousands of verified reviews from motorists and fleets.',
  },
  {
    icon: Briefcase,
    label: 'Commercial Fleet Specialists',
    description: 'Dedicated coordinators for dealerships, logistics, and councils.',
  },
];

export default function TrustBadges() {
  return (
    <section className="border-b border-slate-200 bg-slate-50 py-12">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 xl:px-0">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
            Trusted by drivers across Greater Manchester
          </p>
          <h2 className="mt-3 text-balance text-3xl font-semibold text-slate-900">
            Independent accreditation and reviews you can rely on
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {badges.map(({ icon: Icon, label, description }) => (
            <div
              key={label}
              className="rounded-2xl border border-white/60 bg-white p-6 shadow-[0_15px_45px_-30px_rgba(15,23,42,0.45)]"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-white">
                <Icon className="h-5 w-5" aria-hidden />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">{label}</h3>
              <p className="mt-2 text-sm text-slate-500">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
