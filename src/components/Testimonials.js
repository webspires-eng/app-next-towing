const REVIEWS = [
  { name: "Asif K.", text: "Called at 2am on the M60—arrived in 35 minutes. Professional and careful.", rating: 5 },
  { name: "Jodie R.", text: "Flatbed tow from city centre. Clear price upfront, no surprises.", rating: 5 },
  { name: "Mark D.",  text: "Jump start within 25 min. Friendly driver, great service.", rating: 5 },
];

export default function Testimonials() {
  return (
    <section className="section-shell section-muted text-[#0E172B]">
      <div className="section-inner">
        <div className="section-heading">
          <div className="section-eyebrow border border-[#0E172B]/10 bg-[#0E172B]/5 text-[#0E172B]">
            Testimonials
          </div>
          <h2 className="section-title text-[#0E172B]">What customers say</h2>
          <p className="section-description">
            Feedback from drivers and fleets who rely on our crews every day.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {REVIEWS.map((r) => (
            <figure key={r.name} className="rounded-2xl border border-[#0E172B]/10 bg-white p-6 text-left shadow-[0_24px_60px_-45px_rgba(14,23,43,0.15)]">
              <div className="text-lg text-[#FACC14]" aria-label={`${r.rating} out of 5`}>
                {'★'.repeat(r.rating)}
              </div>
              <blockquote className="mt-4 text-sm text-[#0E172B]/70">“{r.text}”</blockquote>
              <figcaption className="mt-5 text-xs font-semibold uppercase tracking-[0.3em] text-[#0E172B]/50">
                {r.name}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
