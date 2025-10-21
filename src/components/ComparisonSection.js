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
    <section className="section-shell bg-white text-[#0E172B]">
      <div className="section-inner">
        <div className="section-heading">
          <div className="section-eyebrow border border-[#0E172B]/10 bg-[#0E172B]/5 text-[#0E172B]">
            Why drivers switch to Next Towing
          </div>
          <h2 className="section-title text-[#0E172B]">
            Side-by-side with typical recovery brokers and national call centres
          </h2>
          <p className="section-description">
            We cut the friction that slows down traditional recovery: no call transfers, no hidden extras, and no uncertainty
            about who is arriving to help you.
          </p>
        </div>

        <div className="mt-10 overflow-hidden rounded-3xl border border-[#0E172B]/10 bg-white shadow-[0_24px_60px_-45px_rgba(14,23,43,0.15)]">
          <table className="min-w-full divide-y divide-[#0E172B]/10">
            <thead className="bg-[#0E172B]/5 text-left text-sm uppercase tracking-[0.3em] text-[#0E172B]">
              <tr>
                <th className="px-6 py-4 font-semibold">Service factor</th>
                <th className="px-6 py-4 font-semibold text-[#0E172B]">Next Towing</th>
                <th className="px-6 py-4 font-semibold text-[#0E172B]/60">Typical providers</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#0E172B]/10 text-sm">
              {comparisonRows.map(({ label, nextTowing, others }) => (
                <tr key={label} className="transition hover:bg-[#0E172B]/5">
                  <td className="px-6 py-5 text-[#0E172B]/80">{label}</td>
                  <td className="px-6 py-5 font-semibold text-[#0E172B]">{nextTowing}</td>
                  <td className="px-6 py-5 text-[#0E172B]/60">{others}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
