'use client';

import { Clock, Shield, Zap, DollarSign, Truck, MapPin } from 'lucide-react';
import { Card } from '@/components/ui/card';

const features = [
  { icon: Clock, title: '24/7 Emergency Support', description: 'Round-the-clock assistance whenever you need us, day or night' },
  { icon: Shield, title: 'Fully Insured & Certified', description: 'Licensed towing company with comprehensive insurance coverage' },
  { icon: Zap, title: 'Fast Arrival Time', description: 'Average 45-60 minute response time to get you moving' },
  { icon: DollarSign, title: 'Transparent Pricing', description: 'No hidden fees, clear quotes before we arrive' },
  { icon: Truck, title: 'Multi-Vehicle Capability', description: 'From small cars to vans and 4x4s, we recover them all' },
  { icon: MapPin, title: 'Local Area Expertise', description: 'Deep knowledge of local roads and fastest routes' },
];

export default function WhyChooseUs() {
  return (
    <section className="flex justify-center bg-black py-16 md:py-24">
      <div className="container-1300 w-full px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Why Choose Our Recovery Service?
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-white/70">
            Professional vehicle breakdown assistance you can trust, backed by years of experience
          </p>
        </div>

        <div
          className="grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3"
          role="list"
          aria-label="Key reasons to choose us"
        >
          {features.map(({ icon: Icon, title, description }) => (
            <Card
              key={title}
              role="listitem"
              className="flex h-full w-full flex-col items-center rounded-xl border border-white/10 bg-neutral-900/70 p-6 text-center shadow-[0_12px_30px_rgba(0,0,0,0.35)] transition-transform duration-200 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.55)]"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg border border-yellow-400/40 bg-yellow-400/15">
                <Icon className="h-6 w-6 text-yellow-400" aria-hidden="true" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-white">{title}</h3>
              <p className="text-white/70">{description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
