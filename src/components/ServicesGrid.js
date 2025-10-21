'use client';

import { useState } from 'react';
import Link from 'next/link';
import BookingModal from '@/components/BookingModal';
import { Wrench, Car, Truck, Route as RouteIcon, BatteryCharging, CircleDot } from 'lucide-react';

const SERVICES = [
  { icon: Wrench, title: 'Breakdown Recovery', blurb: 'Rapid roadside recovery when your car won’t go.', href: '/services' },
  { icon: Car, title: 'Accident Recovery', blurb: 'Safe transport after collisions, day or night.', href: '/services' },
  { icon: Truck, title: 'Flatbed Towing', blurb: 'AWD & low-clearance friendly vehicle transport.', href: '/services' },
  { icon: RouteIcon, title: 'Motorway Recovery', blurb: 'M60 and nearby motorways covered fast.', href: '/services' },
  { icon: BatteryCharging, title: 'Jump Start', blurb: 'Dead battery? We’ll get you moving.', href: '/services' },
  { icon: CircleDot, title: 'Tyre Change', blurb: 'On-site spare changes & assistance.', href: '/services' },
];


export default function ServicesGrid() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <section className="flex justify-center bg-black py-16 md:py-20">
        <div className="container-1300 w-full px-4">
          {/* Header */}
          <header className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Popular Services</h2>
            <p className="mt-3 text-base text-white/70">
              24/7 towing and on-site assistance across Greater Manchester &amp; the M60.
              Fixed pricing, insured drivers, and fast ETAs.
            </p>
          </header>

          {/* Cards */}
          <div className="grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s) => {
              const Icon = s.icon;
              return (
                <article
                  key={s.title}
                  className="flex h-full flex-col justify-between rounded-lg border border-white/10 bg-neutral-900/70 p-6 text-white shadow-[0_12px_30px_rgba(0,0,0,0.35)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.55)]"
                >
                  <div>
                    <div className="mb-4 flex justify-center">
                      <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg border border-yellow-400/40 bg-yellow-400/15">
                        <Icon className="h-6 w-6 text-yellow-400" />
                      </div>
                    </div>

                    <h3 className="text-center text-xl font-semibold text-white">{s.title}</h3>
                    <p className="mt-2 text-center text-white/70">{s.blurb}</p>

                    <div className="mt-3 flex items-center justify-center">
                      <Link href={s.href} className="text-sm font-medium text-yellow-400 hover:text-yellow-300">
                        Learn more →
                      </Link>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => setOpen(true)}
                      className="inline-flex items-center rounded-md bg-yellow-400 px-4 py-2 text-sm font-semibold text-black shadow-[0_10px_24px_rgba(250,204,21,0.35)] hover:bg-yellow-300"
                    >
                      Get Help
                    </button>
                    <a
                      href="tel:+440000000000"
                      className="inline-flex items-center rounded-md border border-white/20 px-4 py-2 text-sm font-medium text-white hover:border-yellow-400/60 hover:bg-yellow-400/10"
                    >
                      Call Now
                    </a>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Bottom CTA */}
          <div className="mt-12 flex justify-center">
            <Link
              href="/services"
              className="inline-flex items-center rounded-md border border-white/20 px-6 py-3 text-sm font-medium text-white hover:border-yellow-400/60 hover:bg-yellow-400/10"
            >
              View all services
            </Link>
          </div>
        </div>
      </section>

      <BookingModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
