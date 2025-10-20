'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Phone, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Hero() {
  return (
    <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden bg-black text-white">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/hero-recovery.jpeg"
          alt="Professional car recovery tow truck service"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* Overlay gradient for contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80"></div>
      </div>

      {/* Centered content */}
      <div className="relative z-10 container px-4 text-center">
        <div className="mx-auto max-w-3xl">
          {/* Tag */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-yellow-400/20 px-4 py-2 backdrop-blur-sm">
            <Clock className="h-4 w-4 text-yellow-400" />
            <span className="text-sm font-medium text-yellow-400">
              24/7 Emergency Response
            </span>
          </div>

          {/* Heading */}
          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            24/7 Car Recovery &amp; Breakdown Service Across UK
          </h1>

          {/* Subtext */}
          <p className="mb-8 text-lg text-gray-200 md:text-xl">
            Fast, Reliable Vehicle Recovery on M1, M25, M6 &amp; All Major Motorways —
            London, Manchester, Birmingham &amp; Nationwide Coverage
          </p>

          {/* Buttons */}
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button
              asChild
              size="lg"
              className="bg-yellow-400 text-black hover:bg-yellow-500 font-semibold shadow-lg"
            >
              <a href="tel:08001234567">
                <Phone className="mr-2 h-5 w-5" /> Call Now: 0800 123 4567
              </a>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-black font-semibold"
            >
              <Link href="/quote">Get Instant Quote</Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-2 gap-4 text-center sm:grid-cols-4">
            {[
              { stat: '1000+', label: 'Recoveries' },
              { stat: '24/7', label: 'Available' },
              { stat: '45 min', label: 'Avg Response' },
              { stat: '100%', label: 'Insured' },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-lg bg-white/10 p-4 backdrop-blur-sm"
              >
                <div className="text-2xl font-bold text-yellow-400">
                  {item.stat}
                </div>
                <div className="text-sm text-gray-200">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
