import { Check } from 'lucide-react';

const tiers = [
  {
    name: 'Roadside Assist',
    price: '£89',
    description: 'For quick restarts, wheel changes, and short-distance tows within 10 miles.',
    features: ['Jump start & diagnostics', 'Spare wheel fitment', 'Tow to local garage'],
    highlighted: false,
  },
  {
    name: 'Full Recovery',
    price: '£145',
    description: 'Best for breakdowns requiring transport to your chosen destination up to 35 miles.',
    features: ['Flatbed or spectacle lift', 'Passenger drop-off', 'Secure overnight storage option'],
    highlighted: true,
  },
  {
    name: 'Fleet Priority',
    price: 'Custom',
    description: 'Dedicated dispatch team, consolidated invoicing, and multi-vehicle support.',
    features: ['Monthly reporting', 'VIN history tracking', 'Flexible payment terms'],
    highlighted: false,
  },
];

export default function Pricing() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto w-full max-w-6xl px-6 xl:px-0">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Pricing</p>
          <h2 className="mt-3 text-balance text-4xl font-semibold text-slate-900">
            Straightforward packages with no weekend or night surcharges
          </h2>
          <p className="mt-4 text-base text-slate-600">
            Every job is confirmed with a written quote by text and email before our crew sets off, so you always know the
            cost.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {tiers.map(({ name, price, description, features, highlighted }) => (
            <div
              key={name}
              className={`flex h-full flex-col rounded-3xl border p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-xl ${
                highlighted
                  ? 'border-slate-900 bg-slate-900 text-white shadow-[0_40px_80px_-40px_rgba(15,23,42,0.7)]'
                  : 'border-slate-200 bg-white text-slate-900'
              }`}
            >
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
                {highlighted ? 'Most booked' : 'Package'}
              </p>
              <h3 className="mt-4 text-2xl font-semibold">{name}</h3>
              <p className="mt-4 text-5xl font-semibold">{price}</p>
              <p className={`mt-4 text-sm ${highlighted ? 'text-slate-200' : 'text-slate-600'}`}>{description}</p>
              <ul className="mt-6 space-y-3 text-sm">
                {features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <Check className="mt-[2px] h-4 w-4" aria-hidden />
                    <span className={highlighted ? 'text-slate-100' : 'text-slate-600'}>{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                className={`mt-8 inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition ${
                  highlighted
                    ? 'bg-white text-slate-900 hover:bg-slate-100'
                    : 'bg-slate-900 text-white hover:bg-slate-800'
                }`}
              >
                {highlighted ? 'Book this package' : 'Discuss this option'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
