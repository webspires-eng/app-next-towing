'use client';

import { Shield, Award, CheckCircle, Users, Star } from 'lucide-react';
import { Card } from '@/components/ui/card';

export default function TrustBadges() {
  const badges = [
    {
      icon: Shield,
      ring: 'bg-[#00407F]/10',
      color: 'text-[#00407F]',
      title: 'PAS43:2018',
      sub: 'Certified Recovery',
    },
    {
      icon: Award,
      ring: 'bg-[#00407F]/10',
      color: 'text-[#00407F]',
      title: 'Trading Standards',
      sub: 'Approved Service',
    },
    {
      icon: Star,
      ring: 'bg-[#FFBF00]/10',
      color: 'text-[#FFBF00]',
      title: '4.8/5 Stars',
      sub: 'Google Reviews',
    },
    {
      icon: CheckCircle,
      ring: 'bg-[#00407F]/10',
      color: 'text-[#00407F]',
      title: '100% Insured',
      sub: 'Full Coverage',
    },
    {
      icon: Users,
      ring: 'bg-[#00407F]/10',
      color: 'text-[#00407F]',
      title: '10,000+',
      sub: 'Happy Customers',
    },
  ];

  return (
    <section className="py-16 bg-white border-y border-gray-200 flex justify-center">
      <div className="container-1300 px-4 flex flex-col items-center justify-center w-full">
        <div
          className="grid grid-cols-2 md:grid-cols-5 gap-6 w-full"
          role="list"
          aria-label="Company trust badges"
        >
          {badges.map(({ icon: Icon, ring, color, title, sub }) => (
            <Card
              key={title}
              role="listitem"
              className="p-6 h-full flex flex-col items-center justify-center text-center w-full hover:shadow-lg transition-shadow bg-gray-50 border border-gray-100 rounded-xl"
            >
              <div
                className={`mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full ${ring}`}
              >
                <Icon className={`h-6 w-6 ${color}`} aria-hidden="true" />
              </div>
              <div className="text-sm font-semibold text-gray-900 mb-1">
                {title}
              </div>
              <div className="text-xs text-gray-500">{sub}</div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
