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
    <section className="flex justify-center py-16 md:py-24 bg-muted/30">
      <div className="container-1300 w-full px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Why Choose Our Recovery Service?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
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
              className="h-full w-full p-6 rounded-xl border-border bg-card hover:shadow-md transition-shadow
                         flex flex-col items-center text-center"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-card-foreground">{title}</h3>
              <p className="text-muted-foreground">{description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
