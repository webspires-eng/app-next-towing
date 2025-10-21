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
    <section className="section-shell bg-white text-[#0E172B]">
      <div className="section-inner grid gap-12 lg:grid-cols-[1fr_1.1fr]">
        <div className="space-y-6">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#0E172B]">Fleet showcase</p>
          <h2 className="text-balance text-4xl font-semibold text-[#0E172B]">
            Purpose-built recovery vehicles ready for any scenario
          </h2>
          <p className="text-base text-[#0E172B]/70">
            Each unit is equipped with advanced lighting, smart telemetry, and recovery gear to keep your vehicle safe from
            pickup to drop off.
          </p>

          <ul className="space-y-4 text-sm text-[#0E172B]/70">
            {fleet.map(({ name, description, icon: Icon }) => (
              <li key={name} className="flex gap-3 rounded-2xl border border-[#0E172B]/10 bg-white p-4 shadow-[0_24px_60px_-45px_rgba(14,23,43,0.15)]">
                <span className="mt-1 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#0E172B]/5 text-[#0E172B]">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <p className="font-semibold text-[#0E172B]">{name}</p>
                  <p className="mt-1">{description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative h-[460px] overflow-hidden rounded-[2.5rem] border border-[#0E172B]/10">
          <Image
            src="/hero-recovery.jpeg"
            alt="Next Towing fleet"
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 560px, 100vw"
          />
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute bottom-6 left-6 rounded-2xl bg-black/60 px-5 py-4 text-sm text-white backdrop-blur">
            <p className="font-semibold">Telematics monitored</p>
            <p className="text-white/80">Every movement tracked with live ETA updates to dispatch.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
