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
    <section className="section-shell bg-white text-[#0E172B]">
      <div className="section-inner">
        <div className="section-heading">
          <div className="section-eyebrow border border-[#0E172B]/10 bg-[#0E172B]/5 text-[#0E172B]">
            Trusted across Greater Manchester
          </div>
          <h2 className="section-title text-[#0E172B]">
            Independent accreditation and reviews you can rely on
          </h2>
          <p className="section-description">
            Every dispatch is handled by certified operators with the feedback to prove it.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {badges.map(({ icon: Icon, label, description }) => (
            <div
              key={label}
              className="rounded-2xl border border-[#0E172B]/10 bg-white p-6 text-center shadow-[0_18px_45px_-35px_rgba(14,23,43,0.2)]"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#FACC14]/15 text-[#FACC14]">
                <Icon className="h-6 w-6" aria-hidden />
              </div>
              <h3 className="text-lg font-semibold text-[#0E172B]">{label}</h3>
              <p className="mt-2 text-sm text-[#0E172B]/70">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
