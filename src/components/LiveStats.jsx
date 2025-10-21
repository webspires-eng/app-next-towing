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
      iconBg: 'bg-yellow-400/15',
      iconColor: 'text-yellow-400',
      Icon: MapPin,
      value: activeRecoveries,
      label: 'Active Recoveries in Progress',
    },
    {
      iconBg: 'bg-yellow-400/15',
      iconColor: 'text-yellow-400',
      Icon: Clock,
      value: todayRecoveries,
      label: 'Recoveries Completed Today',
    },
    {
      iconBg: 'bg-yellow-400/15',
      iconColor: 'text-yellow-400',
      Icon: Activity,
      value: '24/7',
      label: 'Available Right Now',
    },
  ];

  return (
    <section className="flex justify-center bg-black py-16">
      <div className="container-1300 w-full px-4">
        {/* Header */}
        <div className="flex flex-col items-center justify-center text-center">
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-yellow-400/30 bg-yellow-400/10 px-3 py-1">
            <Activity className="h-4 w-4 text-yellow-400" />
            <span className="text-xs font-medium text-white/80">Live Recovery Dashboard</span>
          </div>
          <p className="text-sm text-white/60">
            Real-time updates • Average response time: <span className="font-semibold text-white">45 minutes</span>
          </p>
        </div>

        {/* Cards */}
        <div className="mt-8 grid w-full grid-cols-1 gap-6 md:grid-cols-3">
          {cards.map(({ Icon, iconBg, iconColor, value, label }) => (
            <Card
              key={label}
              className="h-full w-full rounded-xl border border-white/10 bg-neutral-900/70 p-8 text-center shadow-[0_14px_36px_rgba(0,0,0,0.4)]"
            >
              <div
                className={`mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full ${iconBg}`}
              >
                <Icon className={`h-6 w-6 ${iconColor}`} />
              </div>
              <div className="text-5xl font-extrabold tracking-tight text-white">{value}</div>
              <div className="mt-2 text-sm text-white/70">{label}</div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
