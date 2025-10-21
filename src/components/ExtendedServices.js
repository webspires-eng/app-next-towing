import { Truck, Wrench, Route, Car, ShieldCheck } from 'lucide-react';

const extendedServices = [
  {
    icon: Truck,
    title: 'Heavy recovery & winching',
    description: 'Rigid recovery units and rotators for HGVs, plant equipment, and specialist vehicles stuck off-road.',
  },
  {
    icon: Wrench,
    title: 'On-site mechanical triage',
    description: 'IMI-certified roadside technicians deliver rapid diagnostics, fuel drain, wheel lifts, and temporary fixes.',
  },
  {
    icon: Route,
    title: 'Logistics & dealer handovers',
    description: 'Managed transport for fleet swaps, dealership deliveries, and auction moves with timed slots.',
  },
  {
    icon: Car,
    title: 'EV & prestige vehicle care',
    description: 'Soft-strap, low-angle loading systems with battery-safe protocols for EVs, supercars, and classics.',
  },
  {
    icon: ShieldCheck,
    title: 'Incident management',
    description: 'Comprehensive scene management including traffic control, insurance liaison, and salvage storage.',
  },
];

export default function ExtendedServices() {
  return (
    <section className="bg-slate-950 py-20 text-white">
      <div className="mx-auto w-full max-w-6xl px-6 xl:px-0">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-300">Premium dispatch network</p>
            <h2 className="text-balance text-4xl font-semibold">Extended services for complex recoveries and fleets</h2>
            <p className="text-base text-slate-300">
              Our specialist coordinators build a response plan tailored to the vehicles, payload, and roadside environment with
              live telemetry updates to your team.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-sm text-slate-200 backdrop-blur">
            <p className="font-medium text-white">Dispatch hotline</p>
            <p>Priority scheduling for commercial contracts & fleet members.</p>
            <a className="mt-2 inline-block text-sky-300" href="mailto:dispatch@nexttowing.co.uk">
              dispatch@nexttowing.co.uk
            </a>
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {extendedServices.map(({ icon: Icon, title, description }) => (
            <div key={title} className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8">
              <div className="absolute inset-0 bg-gradient-to-br from-slate-900/0 via-slate-900/10 to-sky-500/10 opacity-0 transition group-hover:opacity-100" />
              <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-sky-500/20 text-sky-300">
                <Icon className="h-6 w-6" aria-hidden />
              </div>
              <h3 className="relative mt-6 text-xl font-semibold text-white">{title}</h3>
              <p className="relative mt-3 text-sm leading-relaxed text-slate-300">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
