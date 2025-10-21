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
    <section className="section-shell bg-white text-[#0E172B]">
      <div className="section-inner">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="section-heading section-heading--left m-0">
            <div className="section-eyebrow border border-[#0E172B]/10 bg-[#0E172B]/5 text-[#0E172B]">
              Premium dispatch network
            </div>
            <h2 className="section-title text-[#0E172B]">
              Extended services for complex recoveries and fleets
            </h2>
            <p className="section-description text-left text-[#0E172B]/70">
              Our specialist coordinators build a response plan tailored to the vehicles, payload, and roadside environment with
              live telemetry updates to your team.
            </p>
          </div>
          <div className="rounded-2xl border border-[#0E172B]/10 bg-white px-6 py-4 text-sm text-[#0E172B] shadow-[0_20px_40px_-40px_rgba(14,23,43,0.15)]">
            <p className="font-medium text-[#0E172B]">Dispatch hotline</p>
            <p>Priority scheduling for commercial contracts &amp; fleet members.</p>
            <a className="mt-2 inline-block text-[#0E172B]" href="mailto:dispatch@nexttowing.co.uk">
              dispatch@nexttowing.co.uk
            </a>
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {extendedServices.map(({ icon: Icon, title, description }) => (
            <div key={title} className="group relative overflow-hidden rounded-3xl border border-[#0E172B]/10 bg-white p-8 shadow-[0_24px_60px_-45px_rgba(14,23,43,0.18)]">
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-[#0E172B]/5 to-[#FACC14]/15 opacity-0 transition group-hover:opacity-100" />
              <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-[#0E172B]/5 text-[#0E172B]">
                <Icon className="h-6 w-6" aria-hidden />
              </div>
              <h3 className="relative mt-6 text-xl font-semibold text-[#0E172B]">{title}</h3>
              <p className="relative mt-3 text-sm leading-relaxed text-[#0E172B]/70">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
