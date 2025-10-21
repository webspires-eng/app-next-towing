'use client';

import Image from 'next/image';
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
    <section className="relative isolate overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_#1f2937_0%,_rgba(15,23,42,0.95)_45%,_#020617_100%)]" />
        <div className="absolute inset-y-0 right-[10%] h-[480px] w-[480px] -translate-y-1/3 rounded-full bg-sky-500/30 blur-3xl" />
        <div className="absolute -left-32 bottom-0 h-64 w-64 rounded-full bg-amber-400/20 blur-3xl" />
      </div>

      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 pb-24 pt-24 lg:flex-row lg:items-center lg:gap-12 lg:pt-28 xl:px-0">
        <div className="max-w-2xl space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-sky-300 shadow-lg shadow-sky-500/10 backdrop-blur">
            <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" aria-hidden />
            24/7 live dispatch • Human support in 30 seconds
          </div>

          <div className="space-y-6">
            <h1 className="text-balance text-4xl font-semibold leading-tight tracking-tight sm:text-5xl md:text-6xl">
              Emergency vehicle recovery, towing & roadside rescue — whenever you need it.
            </h1>
            <p className="text-lg text-slate-200 md:text-xl">
              From motorway breakdowns to driveway transport, Next Towing keeps Greater Manchester moving with rapid response crews, specialist flatbeds, and transparent pricing.
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <Button
              asChild
              size="lg"
              className="bg-amber-400 text-slate-950 shadow-[0_20px_45px_-20px_rgba(251,191,36,0.9)] transition hover:bg-amber-300 hover:text-slate-950"
            >
              <a href="tel:08001234567">
                <PhoneCall className="mr-2 h-5 w-5" aria-hidden /> Call now 0800 123 4567
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/30 bg-white/5 text-white hover:bg-white hover:text-slate-950"
            >
              <Link href="/quote" className="inline-flex items-center">
                Get a recovery quote
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
              </Link>
            </Button>
          </div>

          <div className="grid gap-5 pt-6 md:grid-cols-2">
            {highlights.map(({ icon: Icon, title, description }) => (
              <div key={title} className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-400/20 text-amber-300">
                  <Icon className="h-5 w-5" aria-hidden />
                </div>
                <div>
                  <p className="font-semibold text-white">{title}</p>
                  <p className="text-sm text-slate-300">{description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-x-8 gap-y-4 pt-4">
            {stats.map(({ value, label }) => (
              <div key={label} className="border-l border-white/10 pl-6">
                <div className="text-3xl font-semibold text-amber-300">{value}</div>
                <div className="text-sm text-slate-300">{label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative flex w-full justify-center lg:justify-end">
          <div className="relative w-full max-w-[420px]">
            <div className="rounded-[2rem] border border-white/10 bg-white/10 p-6 shadow-[0_40px_80px_-50px_rgba(56,189,248,0.7)] backdrop-blur">
              <div className="relative aspect-[10/13] overflow-hidden rounded-[1.5rem] border border-white/10">
                <Image
                  src="/hero-recovery.jpeg"
                  alt="Recovery truck loading a sports car"
                  fill
                  priority
                  className="object-cover"
                  sizes="(min-width: 1024px) 420px, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />
              </div>

              <div className="-mt-8 rounded-2xl border border-white/10 bg-slate-950/90 p-6 text-left shadow-lg">
                <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Live job feed</p>
                <div className="mt-4 space-y-3">
                  {[
                    { label: 'BMW 5 Series • M60 J17', status: 'Loaded & en route', time: '08 mins ago' },
                    { label: 'Transit Van • Stockport', status: 'Flatbed assigned', time: '22 mins ago' },
                    { label: 'Audi A3 • City Centre', status: 'Jump start complete', time: '39 mins ago' },
                  ].map(({ label, status, time }) => (
                    <div key={label} className="rounded-xl border border-white/5 bg-white/5 p-4">
                      <div className="text-sm font-medium text-white">{label}</div>
                      <div className="text-xs text-amber-300">{status}</div>
                      <div className="text-[11px] uppercase tracking-wide text-slate-400">{time}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
