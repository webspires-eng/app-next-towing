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
      <div className="relative overflow-hidden rounded-3xl border border-[#0E172B]/10 bg-white p-10 text-[#0E172B] shadow-[0_40px_60px_-40px_rgba(14,23,43,0.15)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(14,23,43,0.08),_transparent_60%)]" aria-hidden />
        <div className="relative grid gap-16 lg:grid-cols-[minmax(0,1fr),minmax(0,420px)] lg:items-start">
          <div>
            <header className="space-y-6">
              <div className="section-eyebrow inline-flex border border-[#0E172B]/10 bg-[#0E172B]/5 text-[#0E172B]">
                Complete recovery suite
              </div>
              <h3 className="text-balance text-3xl font-semibold leading-tight sm:text-4xl">
                Specialist towing, rescue &amp; mobility solutions for any scenario
              </h3>
              <p className="text-base text-[#0E172B]/70">
                Choose the service that fits your breakdown. Every job includes transparent pricing, photo updates, and insured
                operators trained for complex recoveries.
              </p>
            </header>
            <div className="mt-10 hidden gap-6 md:grid md:grid-cols-2">
              {SERVICES.slice(0, 2).map(({ title, blurb, icon: Icon }) => (
                <div key={title} className="rounded-2xl border border-[#0E172B]/10 bg-white p-6 shadow-[0_20px_40px_-40px_rgba(14,23,43,0.2)]">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#FACC14]/15 text-[#FACC14]">
                    <Icon className="h-6 w-6" aria-hidden />
                  </div>
                  <h4 className="text-lg font-semibold text-[#0E172B]">{title}</h4>
                  <p className="mt-2 text-sm text-[#0E172B]/70">{blurb}</p>
                  <Link href="/services" className="mt-4 inline-flex items-center text-sm font-medium text-[#0E172B] hover:text-[#FACC14]">
                    Explore service
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-10 top-1/2 hidden h-[480px] w-[480px] -translate-y-1/2 rounded-full bg-[#FACC14]/15 blur-3xl lg:block" aria-hidden />
            <div className="relative grid w-full gap-6 sm:grid-cols-2">
              {SERVICES.map((s) => {
                const Icon = s.icon;
                return (
                  <article
                    key={s.title}
                    className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-[#0E172B]/10 bg-white p-6 shadow-[0_30px_60px_-50px_rgba(14,23,43,0.18)] transition hover:-translate-y-1 hover:shadow-[0_30px_60px_-40px_rgba(14,23,43,0.25)]"
                  >
                    <div className="flex items-start gap-4">
                      <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#0E172B]/5 text-[#0E172B]">
                        <Icon className="h-6 w-6" aria-hidden />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-[#0E172B]">{s.title}</h4>
                        <p className="mt-2 text-sm text-[#0E172B]/70">{s.blurb}</p>
                      </div>
                    </div>

                    <div className="mt-6 flex items-center justify-between text-sm font-medium text-[#0E172B]">
                      <button
                        type="button"
                        onClick={() => setOpen(true)}
                        className="inline-flex items-center gap-2 rounded-full border border-[#0E172B]/15 bg-[#0E172B]/5 px-4 py-2 text-xs uppercase tracking-wide text-[#0E172B] transition hover:border-[#FACC14] hover:bg-[#FACC14]/15 hover:text-[#0E172B]"
                      >
                        Dispatch crew
                      </button>
                      <Link href={s.href} className="inline-flex items-center gap-1 text-[#0E172B] transition hover:text-[#FACC14]">
                        Details
                        <span aria-hidden>→</span>
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="mt-8 flex flex-col items-center gap-4 rounded-2xl border border-[#0E172B]/10 bg-white p-6 text-center text-[#0E172B] shadow-[0_20px_40px_-40px_rgba(14,23,43,0.18)]">
              <p className="text-sm uppercase tracking-[0.4em] text-[#0E172B]/60">Need something bespoke?</p>
              <p className="text-lg font-semibold text-[#0E172B]">Multi-vehicle, prestige &amp; nationwide logistics arranged same-day.</p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => setOpen(true)}
                  className="inline-flex items-center justify-center rounded-full bg-[#FACC14] px-6 py-2 text-sm font-semibold text-black shadow-lg shadow-[0_20px_40px_rgba(250,204,20,0.25)] transition hover:bg-[#f9c000]"
                >
                  Request callback
                </button>
                <a
                  href="tel:+440000000000"
                  className="inline-flex items-center justify-center rounded-full border border-[#0E172B]/20 px-6 py-2 text-sm font-semibold text-[#0E172B] transition hover:border-[#FACC14] hover:text-[#FACC14]"
                >
                  Speak with dispatch
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BookingModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
