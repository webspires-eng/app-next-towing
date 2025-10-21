'use client';

import Link from 'next/link';
import {
  PhoneCall,
  ArrowRight,
  Clock,
  ShieldCheck,
  MapPin,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const highlights = [
  {
    icon: Clock,
    title: 'Average response 35 minutes',
    description: 'Live-dispatch operators & GPS-tracked fleet',
  },
  {
    icon: ShieldCheck,
    title: 'Fully insured & PAS43:2018 compliant',
    description: 'Every recovery vetted & safety-audited annually',
  },
  {
    icon: MapPin,
    title: 'Greater Manchester • M60 • M56',
    description: 'Rapid city response with nationwide partner network',
  },
];

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
      <div className="absolute inset-0 bg-black/75" aria-hidden />

      <div className="section-inner relative flex flex-col items-center gap-12 text-center">
        <div className="section-heading">
          <div className="section-eyebrow border border-white/20 bg-black/40 text-[#FACC14]">
            <span className="inline-flex h-2 w-2 rounded-full bg-[#FACC14]" aria-hidden />
            24/7 live dispatch
          </div>
          <h1 className="section-title text-balance text-white">
            Emergency vehicle recovery, towing & roadside rescue — whenever you need it.
          </h1>
          <p className="section-description">
            From motorway breakdowns to driveway transport, Next Towing keeps Greater Manchester moving with rapid response crews,
            specialist flatbeds, and transparent pricing.
          </p>
        </div>

        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <Button
            asChild
            size="lg"
            className="bg-[#FACC14] text-black shadow-[0_20px_45px_-20px_rgba(0,0,0,0.6)] transition hover:bg-[#f9c000]"
          >
            <a href="tel:08001234567">
              <PhoneCall className="mr-2 h-5 w-5" aria-hidden /> Call now 0800 123 4567
            </a>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-white/40 bg-white/10 text-white transition hover:bg-white hover:text-black"
          >
            <Link href="/quote" className="inline-flex items-center">
              Get a recovery quote
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
            </Link>
          </Button>
        </div>

        <div className="grid w-full max-w-4xl gap-4 sm:grid-cols-3">
          {highlights.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="flex h-full flex-col items-center gap-3 rounded-2xl border border-white/15 bg-white/10 p-6 text-center backdrop-blur"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-[#FACC14]">
                <Icon className="h-6 w-6" aria-hidden />
              </div>
              <p className="text-lg font-semibold text-white">{title}</p>
              <p className="text-sm text-white/70">{description}</p>
            </div>
          ))}
        </div>

        <div className="grid w-full max-w-3xl gap-4 sm:grid-cols-3">
          {stats.map(({ value, label }) => (
            <div key={label} className="rounded-2xl border border-white/15 bg-white/10 px-6 py-5 text-center backdrop-blur">
              <div className="text-3xl font-semibold text-[#FACC14]">{value}</div>
              <div className="text-sm text-white/70">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
