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
      iconBg: 'bg-[#FFBF00]/15',
      iconColor: 'text-[#FFBF00]',
      Icon: MapPin,
      value: activeRecoveries,
      label: 'Active Recoveries in Progress',
    },
    {
      iconBg: 'bg-[#FFBF00]/15',
      iconColor: 'text-[#FFBF00]',
      Icon: Clock,
      value: todayRecoveries,
      label: 'Recoveries Completed Today',
    },
    {
      iconBg: 'bg-emerald-500/15',
      iconColor: 'text-emerald-600',
      Icon: Activity,
      value: '24/7',
      label: 'Available Right Now',
    },
  ];

  return (
    <section className="flex justify-center bg-[#F6F8FB] py-16">
      <div className="container-1300 w-full px-4">
        {/* Header */}
        <div className="flex flex-col items-center justify-center text-center">
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1">
            <Activity className="h-4 w-4 text-[#00407F]" />
            <span className="text-xs font-medium text-gray-700">Live Recovery Dashboard</span>
          </div>
          <p className="text-sm text-gray-600">
            Real-time updates • Average response time: <span className="font-semibold text-gray-800">45 minutes</span>
          </p>
        </div>

        {/* Cards */}
        <div className="mt-8 grid w-full grid-cols-1 gap-6 md:grid-cols-3">
          {cards.map(({ Icon, iconBg, iconColor, value, label }) => (
            <Card
              key={label}
              className="h-full w-full rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm"
            >
              <div
                className={`mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full ${iconBg}`}
              >
                <Icon className={`h-6 w-6 ${iconColor}`} />
              </div>
              <div className="text-5xl font-extrabold tracking-tight text-gray-900">{value}</div>
              <div className="mt-2 text-sm text-gray-600">{label}</div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
