'use client';

import { useEffect, useState } from 'react';
import { Activity, MapPin, Clock } from 'lucide-react';
import { Card } from '@/components/ui/card';

export default function LiveStats() {
  const [activeRecoveries, setActiveRecoveries] = useState(12);
  const [todayRecoveries, setTodayRecoveries] = useState(47);

  useEffect(() => {
    const id = setInterval(() => {
      setActiveRecoveries((p) => Math.max(8, Math.min(18, p + (Math.random() > 0.5 ? 1 : -1))));
      setTodayRecoveries((p) => p + (Math.random() > 0.7 ? 1 : 0));
    }, 5000);
    return () => clearInterval(id);
  }, []);

  const cards = [
    {
      iconBg: 'bg-[#FACC14]/15',
      iconColor: 'text-[#FACC14]',
      Icon: MapPin,
      value: activeRecoveries,
      label: 'Active Recoveries in Progress',
    },
    {
      iconBg: 'bg-[#FACC14]/15',
      iconColor: 'text-[#FACC14]',
      Icon: Clock,
      value: todayRecoveries,
      label: 'Recoveries Completed Today',
    },
    {
      iconBg: 'bg-[#FACC14]/15',
      iconColor: 'text-[#FACC14]',
      Icon: Activity,
      value: '24/7',
      label: 'Available Right Now',
    },
  ];

  return (
    <section className="section-shell section-muted text-[#0E172B]">
      <div className="section-inner">
        <div className="section-heading">
          <div className="section-eyebrow border border-[#0E172B]/10 bg-[#0E172B]/5 text-[#0E172B]">
            <Activity className="h-4 w-4" aria-hidden />
            Live recovery dashboard
          </div>
          <p className="section-description">
            Real-time updates • Average response time:
            <span className="ml-2 font-semibold text-[#0E172B]">45 minutes</span>
          </p>
        </div>

        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-3">
          {cards.map(({ Icon, iconBg, iconColor, value, label }) => (
            <Card
              key={label}
              className="h-full w-full rounded-2xl border border-[#0E172B]/10 bg-white p-8 text-center shadow-[0_14px_36px_rgba(14,23,43,0.12)]"
            >
              <div className={`mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full ${iconBg}`}>
                <Icon className={`h-6 w-6 ${iconColor}`} />
              </div>
              <div className="text-5xl font-extrabold tracking-tight text-[#0E172B]">{value}</div>
              <div className="mt-2 text-sm text-[#0E172B]/70">{label}</div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
