'use client';

import { useState } from 'react';
import Link from 'next/link';
import BookingModal from '@/components/BookingModal';
import {
  Wrench,
  Car,
  Truck,
  Route,
  BatteryCharging,
  CircleDot,
  Cable,
  Fuel,
} from 'lucide-react';

const SERVICES = [
  {
    icon: Wrench,
    title: 'Breakdown Recovery',
    blurb: 'Rapid roadside lifts for immobilised cars, vans & SUVs with tailored gear.',
    href: '/services',
  },
  {
    icon: Truck,
    title: 'Specialist Flatbed',
    blurb: 'Low loaders for performance, lowered & AWD vehicles with soft-strap securing.',
    href: '/services',
  },
  {
    icon: Car,
    title: 'Accident Assistance',
    blurb: 'Scene-safe recoveries, insurance liaison & onward travel support 24/7.',
    href: '/services',
  },
  {
    icon: BatteryCharging,
    title: 'Jump Starts & Diagnostics',
    blurb: 'On-site battery boosts with advanced testing to keep you on the move.',
    href: '/services',
  },
  {
    icon: Fuel,
    title: 'Emergency Fuel Delivery',
    blurb: 'Diesel & petrol drop-offs with minor roadside assistance built in.',
    href: '/services',
  },
  {
    icon: Route,
    title: 'Motorway Rescue',
    blurb: 'Dedicated M60, M56 & national partner coverage with priority dispatch.',
    href: '/services',
  },
  {
    icon: CircleDot,
    title: 'Tyre Replacement',
    blurb: 'Spare wheel swaps, puncture plugs & alloy-safe refits.',
    href: '/services',
  },
  {
    icon: Cable,
    title: 'Winching & Off-Road Pulls',
    blurb: '4x4 recoveries, ditch extractions & underground car park winching.',
    href: '/services',
  },
];


export default function ServicesGrid() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <section className="relative flex justify-center overflow-hidden bg-slate-950 py-20 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(56,189,248,0.18),_transparent_55%)]" aria-hidden />
        <div className="container-1300 relative w-full px-4">
          <div className="grid gap-16 lg:grid-cols-[minmax(0,1fr),minmax(0,420px)] lg:items-start">
            {/* Header */}
            <div>
              <header className="max-w-2xl space-y-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm tracking-wide text-sky-300 backdrop-blur">
                  Complete recovery suite
                </div>
                <h2 className="text-balance text-3xl font-semibold leading-tight sm:text-4xl">
                  Specialist towing, rescue &amp; mobility solutions for any scenario
                </h2>
                <p className="text-base text-slate-200">
                  Choose the service that fits your breakdown. Every job includes transparent pricing, photo updates, and insured operators trained for complex recoveries.
                </p>
              </header>
<<<<<<< ours

              <div className="mt-10 hidden gap-6 md:grid md:grid-cols-2">
                {SERVICES.slice(0, 2).map(({ title, blurb, icon: Icon }) => (
                  <div key={title} className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-amber-400/10 text-amber-300">
                      <Icon className="h-6 w-6" aria-hidden />
                    </div>
                    <h3 className="text-lg font-semibold text-white">{title}</h3>
                    <p className="mt-2 text-sm text-slate-300">{blurb}</p>
                    <Link href="/services" className="mt-4 inline-flex items-center text-sm font-medium text-sky-300 hover:text-sky-200">
                      Explore service
                    </Link>
                  </div>
                ))}
              </div>
            </div>
=======
>>>>>>> theirs

              <div className="mt-10 hidden gap-6 md:grid md:grid-cols-2">
                {SERVICES.slice(0, 2).map(({ title, blurb, icon: Icon }) => (
                  <div key={title} className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-amber-400/10 text-amber-300">
                      <Icon className="h-6 w-6" aria-hidden />
                    </div>
                    <h3 className="text-lg font-semibold text-white">{title}</h3>
                    <p className="mt-2 text-sm text-slate-300">{blurb}</p>
                    <Link href="/services" className="mt-4 inline-flex items-center text-sm font-medium text-sky-300 hover:text-sky-200">
                      Explore service
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* Cards */}
            <div className="relative">
              <div className="absolute -left-10 top-1/2 hidden h-[480px] w-[480px] -translate-y-1/2 rounded-full bg-amber-400/20 blur-3xl lg:block" aria-hidden />
              <div className="relative grid w-full gap-6 sm:grid-cols-2">
                {SERVICES.map((s) => {
                  const Icon = s.icon;
                  return (
                    <article
                      key={s.title}
                      className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60 p-6 shadow-[0_30px_60px_-50px_rgba(15,23,42,0.9)] backdrop-blur transition hover:-translate-y-1 hover:border-sky-400/40 hover:bg-slate-900/80"
                    >
                      <div className="flex items-start gap-4">
                        <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-sky-400/10 text-sky-300">
                          <Icon className="h-6 w-6" aria-hidden />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-white">{s.title}</h3>
                          <p className="mt-2 text-sm text-slate-300">{s.blurb}</p>
                        </div>
                      </div>

                      <div className="mt-6 flex items-center justify-between text-sm font-medium text-sky-300">
                        <button
                          type="button"
                          onClick={() => setOpen(true)}
                          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-wide text-slate-200 transition hover:border-amber-300/60 hover:bg-amber-400/10 hover:text-white"
                        >
                          Dispatch crew
                        </button>
                        <Link href={s.href} className="inline-flex items-center gap-1 text-sky-300 transition hover:text-sky-200">
                          Details
                          <span aria-hidden>→</span>
                        </Link>
                      </div>
                    </article>
                  );
                })}
              </div>

              <div className="mt-8 flex flex-col items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 text-center text-slate-200 backdrop-blur">
                <p className="text-sm uppercase tracking-[0.4em] text-slate-400">Need something bespoke?</p>
                <p className="text-lg font-semibold text-white">Multi-vehicle, prestige &amp; nationwide logistics arranged same-day.</p>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => setOpen(true)}
                    className="inline-flex items-center justify-center rounded-full bg-amber-400 px-6 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-amber-400/30 transition hover:bg-amber-300"
                  >
                    Request callback
                  </button>
                  <a
                    href="tel:+440000000000"
                    className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-2 text-sm font-semibold text-white transition hover:border-sky-300 hover:text-sky-200"
                  >
                    Speak with dispatch
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <BookingModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
