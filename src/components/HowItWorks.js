const STEPS = [
  { n: 1, title: "Tell us where you are", sub: "Pin your location or share a landmark." },
  { n: 2, title: "We dispatch a driver",  sub: "Live updates & ETA to your phone." },
  { n: 3, title: "On-site fix or tow",   sub: "We try to fix first—tow if needed." }
];

export default function HowItWorks() {
  return (
    <section className="section-alt">
      <div className="container-1300 section-space">
        <header className="section-head">
          <h2>How it works</h2>
        </header>
        <ol className="steps">
          {STEPS.map(s => (
            <li key={s.n} className="step">
              <span className="step-dot">{s.n}</span>
              <div>
                <h3 className="step-title">{s.title}</h3>
                <p className="muted">{s.sub}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
