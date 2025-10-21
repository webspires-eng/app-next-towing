const comparisonRows = [
  {
    label: 'Average response time',
    nextTowing: '35 mins',
    others: '60-90 mins',
  },
  {
    label: 'Live GPS tracking',
    nextTowing: 'Included for all jobs',
    others: 'Often unavailable',
  },
  {
    label: 'EV & low-clearance equipment',
    nextTowing: 'Soft-strap, low-angle ramps',
    others: 'Limited availability',
  },
  {
    label: 'Transparent fixed quotes',
    nextTowing: 'Guaranteed once dispatched',
    others: 'Subject to surcharges',
  },
  {
    label: 'Insurance liaison & paperwork',
    nextTowing: 'Handled by dispatch team',
    others: 'Driver dependent',
  },
];

export default function ComparisonSection() {
  return (
    <section className="bg-slate-900 py-20 text-white">
      <div className="mx-auto w-full max-w-6xl px-6 xl:px-0">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-300">Why drivers switch to Next Towing</p>
          <h2 className="mt-3 text-balance text-4xl font-semibold">
            Side-by-side with typical recovery brokers and national call centres
          </h2>
          <p className="mt-4 text-base text-slate-300">
            We cut the friction that slows down traditional recovery: no call transfers, no hidden extras, and no uncertainty
            about who is arriving to help you.
          </p>
        </div>

        <div className="mt-12 overflow-hidden rounded-3xl border border-white/10 bg-white/5">
          <table className="min-w-full divide-y divide-white/10">
            <thead className="bg-white/5 text-left text-sm uppercase tracking-[0.3em] text-slate-200">
              <tr>
                <th className="px-6 py-4 font-semibold">Service factor</th>
                <th className="px-6 py-4 font-semibold text-sky-300">Next Towing</th>
                <th className="px-6 py-4 font-semibold text-slate-300">Typical providers</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm">
              {comparisonRows.map(({ label, nextTowing, others }) => (
                <tr key={label} className="transition hover:bg-white/10">
                  <td className="px-6 py-5 text-slate-200">{label}</td>
                  <td className="px-6 py-5 font-semibold text-white">{nextTowing}</td>
                  <td className="px-6 py-5 text-slate-300">{others}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
