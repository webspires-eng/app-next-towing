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
    <section className="section-shell bg-white text-[#0E172B]">
      <div className="section-inner">
        <div className="section-heading">
          <div className="section-eyebrow border border-[#0E172B]/10 bg-[#0E172B]/5 text-[#0E172B]">
            Trusted expertise
          </div>
          <h2 className="section-title text-[#0E172B]">Why choose our recovery service?</h2>
          <p className="section-description">
            Professional vehicle breakdown assistance you can trust, backed by years of experience.
          </p>
        </div>

        <div className="grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3" role="list" aria-label="Key reasons to choose us">
          {features.map(({ icon: Icon, title, description }) => (
            <Card
              key={title}
              role="listitem"
              className="flex h-full w-full flex-col items-center rounded-2xl border border-[#0E172B]/10 bg-white p-6 text-center shadow-[0_12px_30px_rgba(14,23,43,0.12)] transition-transform duration-200 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(14,23,43,0.18)]"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-[#FACC14]/40 bg-[#FACC14]/15">
                <Icon className="h-6 w-6 text-[#FACC14]" aria-hidden="true" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-[#0E172B]">{title}</h3>
              <p className="text-[#0E172B]/70">{description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
