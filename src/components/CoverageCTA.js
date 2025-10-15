export default function CoverageCTA() {
  return (
    <section className="container-1300 section-space">
      <div className="coverage">
        <div>
          <h2>Areas we cover</h2>
          <p className="muted">Local teams across Greater Manchester and the M60.</p>
          <div className="chip-row">
            <a className="chip" href="/areas/manchester">Manchester</a>
            <a className="chip" href="/areas/bolton">Bolton</a>
            <a className="chip" href="/areas/m60">M60 Motorway</a>
            <a className="chip" href="/areas">See all areas →</a>
          </div>
        </div>
        <div className="coverage-card" aria-hidden="true">
          <div className="coverage-badge">Live Dispatch</div>
          <div className="coverage-body">
            <div className="art-row"><span className="dot" /> Driver assigned</div>
            <div className="art-row"><span className="dot" /> ETA: 32 min</div>
            <div className="art-row"><span className="dot" /> Job #NT-2083</div>
          </div>
        </div>
      </div>
    </section>
  );
}
