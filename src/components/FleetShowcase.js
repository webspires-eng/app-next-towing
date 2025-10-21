import Image from 'next/image';
import { Truck, Car, BatteryCharging } from 'lucide-react';

const fleet = [
  {
    name: 'Rapid response flatbeds',
    description: 'Low-angle slide beds with wireless winches and soft straps for prestige vehicles.',
    icon: Truck,
  },
  {
    name: 'Specialist EV carriers',
    description: 'Insulated decks, battery-safe procedures, and in-transit charging monitors.',
    icon: BatteryCharging,
  },
  {
    name: 'Spectacle lifts & support vans',
    description: 'Ideal for multi-car incidents and tight urban recoveries.',
    icon: Car,
  },
];

export default function FleetShowcase() {
  return (
    <section className="bg-slate-900 py-20 text-white">
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 lg:grid-cols-[1fr_1.1fr] xl:px-0">
        <div className="space-y-6">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-300">Fleet showcase</p>
          <h2 className="text-balance text-4xl font-semibold">
            Purpose-built recovery vehicles ready for any scenario
          </h2>
          <p className="text-base text-slate-300">
            Each unit is equipped with advanced lighting, smart telemetry, and recovery gear to keep your vehicle safe from
            pickup to drop off.
          </p>

          <ul className="space-y-4 text-sm">
            {fleet.map(({ name, description, icon: Icon }) => (
              <li key={name} className="flex gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                <span className="mt-1 inline-flex h-10 w-10 items-center justify-center rounded-full bg-sky-500/20 text-sky-300">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <p className="font-semibold text-white">{name}</p>
                  <p className="mt-1 text-slate-300">{description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative h-[460px] overflow-hidden rounded-[2.5rem] border border-white/10">
          <Image
            src="/hero-recovery.jpeg"
            alt="Next Towing fleet"
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 560px, 100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
          <div className="absolute bottom-6 left-6 rounded-2xl bg-slate-950/90 px-5 py-4 text-sm">
            <p className="font-semibold text-white">Telematics monitored</p>
            <p className="text-slate-300">Every movement tracked with live ETA updates to dispatch.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
