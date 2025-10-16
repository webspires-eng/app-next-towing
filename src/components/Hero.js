export default function Hero() {
  return (
    <section className="hero">
      <div className="container-1300 hero-inner">
        {/* Left: Copy */}
        <div className="hero-copy">
          <p className="hero-kicker">24/7 Roadside Help</p>

          <h1 className="hero-title">
            Fast, reliable <span className="accent-underline">towing</span>—
            wherever you are.
          </h1>

          <p className="hero-sub">
            Stuck on the road? Our mobile team gets to you fast with towing,
            tyre changes, and jump starts. Built on Next.js for speed and
            reliability.
          </p>

          <div className="hero-ctas">
            <a href="/booking" className="btn">Get Help Now</a>
            <a href="/about" className="btn btn-outline">Learn More</a>
          </div>

          <div className="hero-trust">
            <div className="pill">⏱ Avg. ETA ~ 30–45 min</div>
            <div className="pill">⭐ 4.9/5 customer rating</div>
            <div className="pill">🛠 On-site fixes first</div>
          </div>
        </div>

        {/* Right: Visual */}
        <div className="hero-art" aria-hidden="true">
          <div className="art-card">
            <div className="art-badge">Live Dispatch</div>
            <div className="art-body">
              <div className="art-row">
                <span className="dot" /> Driver assigned
              </div>
              <div className="art-row">
                <span className="dot" /> ETA: 32 min
              </div>
              <div className="art-row">
                <span className="dot" /> Job #NT-2083
              </div>
            </div>
            <div className="art-footer">Tracking active • Secure</div>
          </div>
        </div>
      </div>
    </section>
  );
}
