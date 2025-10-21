import { MapPin, Navigation, ArrowRight } from 'lucide-react';

const areas = [
  'Greater Manchester & Salford',
  'M60, M56, M62 corridors',
  'Stockport, Bolton, Wigan, Rochdale',
  'Airport & port transfers',
];

export default function LocalCoverage() {
  return (
    <section className="section-shell bg-white text-[#0E172B]">
      <div className="section-inner grid gap-12 lg:grid-cols-[1fr_1.1fr]">
        <div className="space-y-6">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#0E172B]">Local coverage</p>
          <h2 className="text-balance text-4xl font-semibold text-[#0E172B]">Hyperlocal knowledge with nationwide reach</h2>
          <p className="text-base text-[#0E172B]/70">
            Our dispatchers grew up on these roads. From Trafford Park to the M60 ring, we know the cut-throughs and
            restrictions that save time and keep you safe.
          </p>

          <ul className="space-y-3 text-sm text-[#0E172B]/70">
            {areas.map((area) => (
              <li key={area} className="flex items-center gap-3">
                <ArrowRight className="h-4 w-4 text-[#0E172B]/40" aria-hidden />
                {area}
              </li>
            ))}
          </ul>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-3xl border border-[#0E172B]/10 bg-white p-6 shadow-[0_24px_60px_-45px_rgba(14,23,43,0.15)]">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#0E172B] text-white">
              <MapPin className="h-5 w-5" aria-hidden />
            </div>
            <p className="mt-4 text-lg font-semibold text-[#0E172B]">City response hubs</p>
            <p className="mt-2 text-sm text-[#0E172B]/70">
              Trafford Park, Stockport, Bolton — rapid deployment from three local bases.
            </p>
          </div>
          <div className="rounded-3xl border border-[#0E172B]/10 bg-white p-6 shadow-[0_24px_60px_-45px_rgba(14,23,43,0.15)]">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#0E172B] text-white">
              <Navigation className="h-5 w-5" aria-hidden />
            </div>
            <p className="mt-4 text-lg font-semibold text-[#0E172B]">Nationwide partner network</p>
            <p className="mt-2 text-sm text-[#0E172B]/70">
              Trusted partners for onward journeys beyond the North West, coordinated through our control room.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
