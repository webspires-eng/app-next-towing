'use client';

import { useState } from 'react';
import Link from 'next/link';
import BookingModal from '@/components/BookingModal';
import { Wrench, Car, Truck, Road, BatteryCharging, CircleDot } from 'lucide-react';

const SERVICES = [
  { icon: Wrench, title: 'Breakdown Recovery', blurb: 'Rapid roadside recovery when your car won’t go.', href: '/services' },
  { icon: Car, title: 'Accident Recovery', blurb: 'Safe transport after collisions, day or night.', href: '/services' },
  { icon: Truck, title: 'Flatbed Towing', blurb: 'AWD & low-clearance friendly vehicle transport.', href: '/services' },
  { icon: Road, title: 'Motorway Recovery', blurb: 'M60 and nearby motorways covered fast.', href: '/services' },
  { icon: BatteryCharging, title: 'Jump Start', blurb: 'Dead battery? We’ll get you moving.', href: '/services' },
  { icon: CircleDot, title: 'Tyre Change', blurb: 'On-site spare changes & assistance.', href: '/services' },
];


export default function ServicesGrid() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <section className="flex justify-center py-16 md:py-20 bg-muted/30">
        <div className="container-1300 w-full px-4">
          {/* Header */}
          <header className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Popular Services</h2>
            <p className="mt-3 text-base text-muted-foreground">
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
                  className="flex h-full flex-col justify-between rounded-lg border border-border bg-card p-6 hover:shadow-medium transition-shadow duration-300"
                >
                  <div>
                    <div className="mb-4 flex justify-center">
                      <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                    </div>

                    <h3 className="text-center text-xl font-semibold text-card-foreground">{s.title}</h3>
                    <p className="mt-2 text-center text-muted-foreground">{s.blurb}</p>

                    <div className="mt-3 flex items-center justify-center">
                      <Link href={s.href} className="text-sm font-medium text-primary hover:underline">
                        Learn more →
                      </Link>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => setOpen(true)}
                      className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary/90"
                    >
                      Get Help
                    </button>
                    <a
                      href="tel:+440000000000"
                      className="inline-flex items-center rounded-md border border-border px-4 py-2 text-sm font-medium hover:bg-accent"
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
              className="inline-flex items-center rounded-md border border-border px-6 py-3 text-sm font-medium hover:bg-accent"
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
