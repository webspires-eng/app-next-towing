import { CloudRain, Snowflake, Sun } from 'lucide-react';

const stats = [
  {
    season: 'Winter',
    icon: Snowflake,
    figure: '1,240 callouts',
    detail: 'Snow and ice preparedness with grit support and 4x4 fleet.',
  },
  {
    season: 'Spring',
    icon: CloudRain,
    figure: '980 callouts',
    detail: 'Flood response and water-damaged vehicle recovery.',
  },
  {
    season: 'Summer',
    icon: Sun,
    figure: '1,120 callouts',
    detail: 'Holiday motorway cover and overheating assistance.',
  },
];

export default function SeasonalStats() {
  return (
    <section className="section-shell section-muted text-[#0E172B]">
      <div className="section-inner">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="section-heading section-heading--left m-0">
            <div className="section-eyebrow border border-[#0E172B]/10 bg-[#0E172B]/5 text-[#0E172B]">Seasonal stats</div>
            <h2 className="section-title text-[#0E172B]">Prepared for every weather pattern</h2>
            <p className="section-description text-left">
              We monitor seasonal trends so our dispatch team can pre-position vehicles and equipment before the call comes in.
            </p>
          </div>
          <div className="rounded-3xl border border-[#0E172B]/10 bg-white p-6 text-sm text-[#0E172B] shadow-[0_24px_60px_-45px_rgba(14,23,43,0.15)]">
            <p className="text-xs uppercase tracking-[0.4em] text-[#0E172B]/60">Live insights</p>
            <p className="mt-3 text-lg font-semibold text-[#0E172B]">Weather-adjusted response planning in place 365 days.</p>
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {stats.map(({ season, icon: Icon, figure, detail }) => (
            <div key={season} className="rounded-3xl border border-[#0E172B]/10 bg-white p-6 shadow-[0_24px_60px_-45px_rgba(14,23,43,0.15)]">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#0E172B]/5 text-[#0E172B]">
                <Icon className="h-5 w-5" aria-hidden />
              </div>
              <p className="mt-4 text-sm font-semibold uppercase tracking-[0.3em] text-[#0E172B]/60">{season}</p>
              <p className="mt-3 text-3xl font-semibold text-[#0E172B]">{figure}</p>
              <p className="mt-3 text-sm text-[#0E172B]/70">{detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
