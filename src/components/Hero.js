'use client';

import Link from 'next/link';
import { PhoneCall, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const stats = [
  { value: '12k+', label: 'Vehicles recovered' },
  { value: '4.9/5', label: 'Average review score' },
  { value: '365', label: 'Days a year on call' },
];

export default function Hero() {
  return (
    <section
      className="section-shell relative isolate overflow-hidden text-white"
      style={{
        backgroundImage: "url('/hero-recovery.jpeg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.82),rgba(0,0,0,0.6),rgba(0,0,0,0.85))]" aria-hidden />

      <div className="section-inner relative flex flex-col items-center gap-10 text-center lg:max-w-4xl">
        <div className="section-heading mb-0 space-y-6">
          <div className="section-eyebrow border border-white/20 bg-white/10 text-[#FACC14]">
            <span className="inline-flex h-2 w-2 rounded-full bg-[#FACC14]" aria-hidden />
            24/7 live dispatch
          </div>
         <h1 class="text-white text-5xl md:text-6xl lg:text-5xl font-extrabold drop-shadow-2xl">
  Emergency vehicle recovery, towing & roadside rescue — whenever you need it
</h1>

          <p className="section-description text-white">
            From motorway breakdowns to driveway transport, our control room keeps Greater Manchester moving with real-time dispatch,
            specialist flatbeds, and pricing confirmed before we roll.
          </p>
        </div>

        <div className="flex flex-col items-center gap-4 text-base font-semibold sm:flex-row">
          <Button
            asChild
            size="lg"
            className="rounded-full bg-[#FACC14] px-8 py-3 text-black shadow-[0_20px_45px_-18px_rgba(250,204,20,0.85)] transition hover:bg-[#ffe05a] hover:shadow-[0_24px_55px_-20px_rgba(250,204,20,0.9)]"
          >
            <a href="tel:08001234567">
              <PhoneCall className="mr-2 h-5 w-5" aria-hidden /> Call now 0800 123 4567
            </a>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="rounded-full border-white/70 bg-transparent px-8 py-3 text-white transition hover:border-white hover:bg-white/10"
          >
            <Link href="/quote" className="inline-flex items-center">
              Get a recovery quote
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
            </Link>
          </Button>
        </div>

        <div className="grid w-full max-w-4xl gap-4 sm:grid-cols-3">
          {stats.map(({ value, label }) => (
            <div key={label} className="rounded-2xl border border-white/20 bg-white/10 px-6 py-6 text-center backdrop-blur-sm">
              <div className="text-3xl font-semibold text-white drop-shadow-sm">{value}</div>
              <div className="mt-1 text-sm text-white/70">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
