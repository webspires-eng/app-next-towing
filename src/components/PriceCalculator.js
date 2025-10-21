"use client";

import { useMemo, useState } from 'react';
import { Calculator, Gauge, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

const vehicleClasses = [
  { label: 'City car', multiplier: 1 },
  { label: 'SUV / 4x4', multiplier: 1.25 },
  { label: 'Van / LCV', multiplier: 1.5 },
  { label: 'Performance / EV', multiplier: 1.65 },
];

const baseCallout = 65;
const mileageRate = 1.8;

export default function PriceCalculator() {
  const [distance, setDistance] = useState(15);
  const [vehicleIndex, setVehicleIndex] = useState(0);

  const estimate = useMemo(() => {
    const multiplier = vehicleClasses[vehicleIndex]?.multiplier ?? 1;
    return Math.round((baseCallout + distance * mileageRate) * multiplier);
  }, [distance, vehicleIndex]);

  return (
    <section className="bg-slate-50 py-20">
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 lg:grid-cols-[1.2fr_1fr] xl:px-0">
        <div className="space-y-6">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Instant quote builder</p>
          <h2 className="text-balance text-4xl font-semibold text-slate-900">Transparent pricing before we dispatch</h2>
          <p className="text-base text-slate-600">
            Tailor the estimate for your recovery distance and vehicle profile. Our operators lock in the price you see unless
            the scene changes on arrival.
          </p>

          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-white">
                <Calculator className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">Step 1</p>
                <h3 className="text-xl font-semibold text-slate-900">Select your vehicle type</h3>
              </div>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {vehicleClasses.map(({ label }, index) => {
                const active = index === vehicleIndex;
                return (
                  <button
                    key={label}
                    type="button"
                    onClick={() => setVehicleIndex(index)}
                    className={`rounded-2xl border p-4 text-left transition focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 ${
                      active
                        ? 'border-slate-900 bg-slate-900 text-white shadow-[0_25px_50px_-25px_rgba(15,23,42,0.65)]'
                        : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-400'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-base font-semibold">{label}</span>
                      <Gauge className="h-5 w-5" aria-hidden />
                    </div>
                    <p className={`mt-2 text-sm ${active ? 'text-slate-200' : 'text-slate-500'}`}>
                      Suitable for curbside loading and secure transport.
                    </p>
                  </button>
                );
              })}
            </div>

            <div className="mt-8 border-t border-slate-200 pt-6">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-900">
                  <MapPin className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">Step 2</p>
                  <h3 className="text-xl font-semibold text-slate-900">Set recovery distance (miles)</h3>
                </div>
              </div>
              <div className="mt-6">
                <input
                  type="range"
                  min={1}
                  max={150}
                  step={1}
                  value={distance}
                  onChange={(event) => setDistance(Number(event.target.value))}
                  className="h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-slate-900"
                />
                <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
                  <span>1 mile</span>
                  <span>{distance} miles</span>
                  <span>150 miles</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <aside className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-8 shadow-lg shadow-slate-900/5">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">Estimated dispatch quote</p>
            <p className="mt-4 text-5xl font-semibold text-slate-900">£{estimate}</p>
            <p className="mt-2 text-sm text-slate-500">
              Includes call-out, recovery crew, and standard mileage. Additional services such as secure storage are quoted on
              confirmation.
            </p>
          </div>
          <Button size="lg" className="mt-8 w-full bg-slate-900 text-white hover:bg-slate-800">
            Lock in this estimate
          </Button>
        </aside>
      </div>
    </section>
  );
}
