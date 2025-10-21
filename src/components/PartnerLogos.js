const partners = ['Greater Manchester Police', 'Highways England', 'Manchester Airport', 'AA Approved', 'RAC Partner'];

export default function PartnerLogos() {
  return (
    <section className="bg-slate-50 py-16">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-8 px-6 text-center xl:px-0">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Trusted collaborations</p>
        <div className="flex flex-wrap justify-center gap-6 text-sm font-semibold uppercase tracking-[0.35em] text-slate-400">
          {partners.map((partner) => (
            <span key={partner} className="rounded-full border border-slate-200 bg-white px-5 py-3 text-slate-500 shadow-sm">
              {partner}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
