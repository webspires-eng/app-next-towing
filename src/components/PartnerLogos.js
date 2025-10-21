const partners = ['Greater Manchester Police', 'Highways England', 'Manchester Airport', 'AA Approved', 'RAC Partner'];

export default function PartnerLogos() {
  return (
    <section className="section-shell bg-white text-[#0E172B]">
      <div className="section-inner flex w-full flex-col items-center gap-8 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#0E172B]">Trusted collaborations</p>
        <div className="flex flex-wrap justify-center gap-6 text-sm font-semibold uppercase tracking-[0.35em] text-[#0E172B]/50">
          {partners.map((partner) => (
            <span key={partner} className="rounded-full border border-[#0E172B]/10 bg-white px-5 py-3 text-[#0E172B]/70 shadow-sm">
              {partner}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
