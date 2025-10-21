'use client';

import { Shield, Award, CheckCircle, Users, Star } from 'lucide-react';
import { Card } from '@/components/ui/card';

export default function TrustBadges() {
  const badges = [
    {
      icon: Shield,
      title: 'PAS43:2018',
      sub: 'Certified Recovery',
    },
    {
      icon: Award,
      title: 'Trading Standards',
      sub: 'Approved Service',
    },
    {
      icon: Star,
      title: '4.8/5 Stars',
      sub: 'Google Reviews',
    },
    {
      icon: CheckCircle,
      title: '100% Insured',
      sub: 'Full Coverage',
    },
    {
      icon: Users,
      title: '10,000+',
      sub: 'Happy Customers',
    },
  ];

  return (
    <section className="flex justify-center border-y border-white/10 bg-black py-16">
      <div className="container-1300 w-full px-4">
        <div
          className="grid w-full grid-cols-2 gap-6 md:grid-cols-5"
          role="list"
          aria-label="Company trust badges"
        >
          {badges.map(({ icon: Icon, title, sub }) => (
            <Card
              key={title}
              role="listitem"
              className="flex h-full w-full flex-col items-center justify-center rounded-xl border border-white/10 bg-neutral-900/60 p-6 text-center shadow-[0_12px_30px_rgba(0,0,0,0.25)] transition-transform duration-200 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.45)]"
            >
              <div
                className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full border border-yellow-400/40 bg-yellow-400/15"
              >
                <Icon className="h-6 w-6 text-yellow-400" aria-hidden="true" />
              </div>
              <div className="mb-1 text-sm font-semibold text-white">
                {title}
              </div>
              <div className="text-xs text-white/70">{sub}</div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
