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
    <section className="bg-slate-900 py-20 text-white">
      <div className="mx-auto w-full max-w-6xl px-6 xl:px-0">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-300">Seasonal stats</p>
            <h2 className="text-balance text-4xl font-semibold">Prepared for every weather pattern</h2>
            <p className="text-base text-slate-300">
              We monitor seasonal trends so our dispatch team can pre-position vehicles and equipment before the call comes in.
            </p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-slate-200 backdrop-blur">
            <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Live insights</p>
            <p className="mt-3 text-lg font-semibold text-white">Weather-adjusted response planning in place 365 days.</p>
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {stats.map(({ season, icon: Icon, figure, detail }) => (
            <div key={season} className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-sky-500/20 text-sky-300">
                <Icon className="h-5 w-5" aria-hidden />
              </div>
              <p className="mt-4 text-sm font-semibold uppercase tracking-[0.3em] text-slate-300">{season}</p>
              <p className="mt-3 text-3xl font-semibold text-white">{figure}</p>
              <p className="mt-3 text-sm text-slate-300">{detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
