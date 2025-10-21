// components/faq.js
// Server Component-safe (no hooks needed). If you prefer client, add: "use client";

const QA = [
  { q: "How fast can you reach me?", a: "Average ETA 30–45 minutes depending on traffic and location." },
  { q: "Do you cover motorways?",   a: "Yes — M60 and surrounding routes." },
  { q: "What vehicles do you tow?", a: "Cars, SUVs, vans, and motorcycles. Call for special vehicles." },
];

function toJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: QA.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}

export default function FAQ() {
  return (
    <section className="section-shell bg-white text-[#0E172B]">
      {/* SEO: FAQPage schema */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toJsonLd()) }}
      />

      <div className="section-inner">
        <header className="section-heading">
          <div className="section-eyebrow border border-[#0E172B]/10 bg-[#0E172B]/5 text-[#0E172B]">Support</div>
          <h2 className="section-title text-[#0E172B]">Frequently asked questions</h2>
          <p className="section-description">Quick answers to the most common questions.</p>
        </header>

        <div className="relative rounded-2xl border border-[#0E172B]/10 bg-white shadow-[0_24px_60px_-45px_rgba(14,23,43,0.15)]">
          <div className="pointer-events-none absolute -inset-1 rounded-3xl bg-gradient-to-br from-[#FACC14]/15 via-transparent to-[#0E172B]/10 blur-2xl" />
          <div className="relative p-2 md:p-4">
            <ul className="divide-y divide-[#0E172B]/10 rounded-xl">
              {QA.map(({ q, a }) => (
                <li key={q}>
                  <details className="group">
                    <summary className="flex w-full cursor-pointer list-none items-center gap-3 rounded-xl px-4 py-4 transition-colors hover:bg-[#0E172B]/5 md:px-6 md:py-5">
                      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md border border-[#0E172B]/20 text-[#0E172B]/70" aria-hidden="true">
                        <svg
                          className="h-3.5 w-3.5 transition-transform duration-300 group-open:rotate-180"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.13l3.71-3.9a.75.75 0 111.08 1.04l-4.24 4.46a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" />
                        </svg>
                      </span>
                      <h3 className="text-base font-semibold leading-snug text-[#0E172B] md:text-lg">{q}</h3>
                    </summary>

                    <div className="px-4 pb-4 md:px-6 md:pb-6">
                      <p className="text-sm leading-relaxed text-[#0E172B]/70">{a}</p>
                    </div>
                  </details>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
