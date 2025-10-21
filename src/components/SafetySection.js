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
    <section className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 py-20 text-white">
      <div className="mx-auto w-full max-w-6xl px-6 xl:px-0">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-300">Safety first</p>
          <h2 className="mt-3 text-balance text-4xl font-semibold">Safety processes built into every dispatch</h2>
          <p className="mt-4 text-base text-slate-300">
            Your crew arrives prepared to manage the scene, communicate with authorities, and keep everyone protected.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {safetyPoints.map(({ icon: Icon, title, description }) => (
            <div key={title} className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-sky-500/20 text-sky-300">
                <Icon className="h-5 w-5" aria-hidden />
              </div>
              <h3 className="text-lg font-semibold text-white">{title}</h3>
              <p className="mt-2 text-sm text-slate-300">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
