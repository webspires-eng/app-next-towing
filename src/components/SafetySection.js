import { AlertTriangle, HardHat, ShieldCheck, TrafficCone } from 'lucide-react';

const safetyPoints = [
  {
    icon: HardHat,
    title: 'PAS43-compliant crews',
    description: 'Every operator follows strict roadside safety protocols and carries full PPE.',
  },
  {
    icon: TrafficCone,
    title: 'Scene protection kits',
    description: 'High-visibility lighting towers, cones, and spill control deployed at every incident.',
  },
  {
    icon: ShieldCheck,
    title: 'Insured & vetted partners',
    description: 'Extended network partners audited quarterly and fully insured for recovery work.',
  },
  {
    icon: AlertTriangle,
    title: 'Live risk assessments',
    description: 'Dispatch updates risk logs in real time for highways and insurers.',
  },
];

export default function SafetySection() {
  return (
    <section className="section-shell section-muted text-[#0E172B]">
      <div className="section-inner">
        <div className="section-heading">
          <div className="section-eyebrow border border-[#0E172B]/10 bg-[#0E172B]/5 text-[#0E172B]">Safety first</div>
          <h2 className="section-title text-[#0E172B]">Safety processes built into every dispatch</h2>
          <p className="section-description">
            Your crew arrives prepared to manage the scene, communicate with authorities, and keep everyone protected.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {safetyPoints.map(({ icon: Icon, title, description }) => (
            <div key={title} className="rounded-3xl border border-[#0E172B]/10 bg-white p-6 shadow-[0_24px_60px_-45px_rgba(14,23,43,0.15)]">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#0E172B]/5 text-[#0E172B]">
                <Icon className="h-5 w-5" aria-hidden />
              </div>
              <h3 className="text-lg font-semibold text-[#0E172B]">{title}</h3>
              <p className="mt-2 text-sm text-[#0E172B]/70">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
