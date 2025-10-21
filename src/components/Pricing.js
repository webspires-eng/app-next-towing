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
    <section className="section-shell section-muted text-[#0E172B]">
      <div className="section-inner">
        <div className="section-heading">
          <div className="section-eyebrow border border-[#0E172B]/10 bg-[#0E172B]/5 text-[#0E172B]">Pricing</div>
          <h2 className="section-title text-[#0E172B]">
            Straightforward packages with no weekend or night surcharges
          </h2>
          <p className="section-description">
            Every job is confirmed with a written quote by text and email before our crew sets off, so you always know the cost.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {tiers.map(({ name, price, description, features, highlighted }) => (
            <div
              key={name}
              className={`flex h-full flex-col rounded-3xl border p-8 shadow-[0_30px_60px_-45px_rgba(14,23,43,0.15)] transition hover:-translate-y-1 ${
                highlighted
                  ? 'border-[#FACC14] bg-[#0E172B] text-white'
                  : 'border-[#0E172B]/10 bg-white'
              }`}
            >
              <p className={`text-xs font-semibold uppercase tracking-[0.3em] ${highlighted ? 'text-white/70' : 'text-[#0E172B]/60'}`}>
                {highlighted ? 'Most booked' : 'Package'}
              </p>
              <h3 className={`mt-4 text-2xl font-semibold ${highlighted ? 'text-white' : 'text-[#0E172B]'}`}>{name}</h3>
              <p className={`mt-4 text-5xl font-semibold ${highlighted ? 'text-[#FACC14]' : 'text-[#0E172B]'}`}>{price}</p>
              <p className={`mt-4 text-sm ${highlighted ? 'text-white/75' : 'text-[#0E172B]/70'}`}>{description}</p>
              <ul className={`mt-6 space-y-3 text-sm ${highlighted ? 'text-white/80' : 'text-[#0E172B]/80'}`}>
                {features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <Check className="mt-[2px] h-4 w-4 text-[#FACC14]" aria-hidden />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                className={`mt-8 inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition ${
                  highlighted
                    ? 'bg-white text-[#0E172B] hover:bg-[#FACC14]'
                    : 'bg-[#0E172B] text-white hover:bg-[#0E172B]/90'
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
