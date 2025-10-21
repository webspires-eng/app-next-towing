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
    <section className="container-1300 section-space text-white">
      {/* SEO: FAQPage schema */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toJsonLd()) }}
      />

      <header className="section-head text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">FAQs</h2>
        <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
          Quick answers to the most common questions.
        </p>
      </header>

      <div className="relative rounded-2xl border bg-card/60 backdrop-blur supports-[backdrop-filter]:bg-card/70">
        <div className="pointer-events-none absolute -inset-1 rounded-2xl bg-gradient-to-br from-primary/10 via-transparent to-primary/10 blur-2xl" />
        <div className="relative p-2 md:p-4">
          <ul className="divide-y rounded-xl">
            {QA.map(({ q, a }) => (
              <li key={q}>
                <details className="group">
                  <summary className="flex w-full items-center gap-3 cursor-pointer list-none px-4 py-4 md:px-6 md:py-5 hover:bg-muted/40 rounded-xl transition-colors">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md border" aria-hidden="true">
                      <svg
                        className="h-3.5 w-3.5 transition-transform duration-300 group-open:rotate-180"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.13l3.71-3.9a.75.75 0 111.08 1.04l-4.24 4.46a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" />
                      </svg>
                    </span>
                    <h3 className="text-base md:text-lg font-semibold leading-snug">{q}</h3>
                  </summary>

                  <div className="px-4 pb-4 md:px-6 md:pb-6">
                    <p className="text-muted-foreground leading-relaxed">{a}</p>
                  </div>
                </details>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
