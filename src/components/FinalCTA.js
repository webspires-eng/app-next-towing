export default function FinalCTA() {
  return (
    <section className="section-shell section-muted relative overflow-hidden text-[#0E172B]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,_rgba(250,204,20,0.15),_transparent_70%)]" aria-hidden />
      <div className="section-inner relative flex flex-col gap-6 rounded-3xl border border-[#0E172B]/10 bg-white p-10 text-center shadow-[0_30px_60px_-40px_rgba(14,23,43,0.15)] lg:flex-row lg:items-center lg:justify-between lg:text-left">
        <div className="space-y-2">
          <h2 className="text-3xl font-semibold text-[#0E172B] sm:text-4xl">Need help right now?</h2>
          <p className="text-sm uppercase tracking-[0.3em] text-[#0E172B]/60">
            24/7 dispatch • Fixed pricing • Trusted local drivers
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <a
            className="inline-flex items-center justify-center rounded-full bg-[#FACC14] px-6 py-3 text-sm font-semibold text-black transition hover:bg-[#f9c000]"
            href="tel:+440000000000"
          >
            Call now
          </a>
          <a
            className="inline-flex items-center justify-center rounded-full border border-[#0E172B]/20 px-6 py-3 text-sm font-semibold text-[#0E172B] transition hover:border-[#FACC14] hover:text-[#FACC14]"
            href="/contact"
          >
            Book online
          </a>
        </div>
      </div>
    </section>
  );
}
