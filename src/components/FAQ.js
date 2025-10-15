const QA = [
  { q: "How fast can you reach me?", a: "Average ETA 30–45 minutes depending on traffic and location." },
  { q: "Do you cover motorways?",   a: "Yes — M60 and surrounding routes." },
  { q: "What vehicles do you tow?", a: "Cars, SUVs, vans, and motorcycles. Call for special vehicles." },
];

export default function FAQ() {
  return (
    <section className="container-1300 section-space">
      <header className="section-head">
        <h2>FAQs</h2>
      </header>
      <div className="faqs">
        {QA.map(item => (
          <details key={item.q} className="faq">
            <summary>{item.q}</summary>
            <p className="muted">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
