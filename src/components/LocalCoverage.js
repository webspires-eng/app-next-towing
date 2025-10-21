import { MapPin, Navigation, ArrowRight } from 'lucide-react';

const areas = [
  'Greater Manchester & Salford',
  'M60, M56, M62 corridors',
  'Stockport, Bolton, Wigan, Rochdale',
  'Airport & port transfers',
];

export default function LocalCoverage() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 lg:grid-cols-[1fr_1.1fr] xl:px-0">
        <div className="space-y-6">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Local coverage</p>
          <h2 className="text-balance text-4xl font-semibold text-slate-900">Hyperlocal knowledge with nationwide reach</h2>
          <p className="text-base text-slate-600">
            Our dispatchers grew up on these roads. From Trafford Park to the M60 ring, we know the cut-throughs and
            restrictions that save time and keep you safe.
          </p>

          <ul className="space-y-3 text-sm text-slate-600">
            {areas.map((area) => (
              <li key={area} className="flex items-center gap-3">
                <ArrowRight className="h-4 w-4 text-slate-400" aria-hidden />
                {area}
              </li>
            ))}
          </ul>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-white">
              <MapPin className="h-5 w-5" aria-hidden />
            </div>
            <p className="mt-4 text-lg font-semibold text-slate-900">City response hubs</p>
            <p className="mt-2 text-sm text-slate-600">
              Trafford Park, Stockport, Bolton — rapid deployment from three local bases.
            </p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-white">
              <Navigation className="h-5 w-5" aria-hidden />
            </div>
            <p className="mt-4 text-lg font-semibold text-slate-900">Nationwide partner network</p>
            <p className="mt-2 text-sm text-slate-600">
              Trusted partners for onward journeys beyond the North West, coordinated through our control room.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
