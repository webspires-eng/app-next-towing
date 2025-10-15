import Link from "next/link";

const SERVICES = [
  { title: "Breakdown Recovery", blurb: "Rapid roadside recovery when your car won’t go.", href: "/services", icon: "🛠️" },
  { title: "Accident Recovery",  blurb: "Safe transport after collisions, day or night.",   href: "/services", icon: "🚑" },
  { title: "Flatbed Towing",     blurb: "AWD & low-clearance friendly vehicle transport.", href: "/services", icon: "🛻" },
  { title: "Motorway Recovery",  blurb: "M60 and nearby motorways covered fast.",          href: "/services", icon: "🛣️" },
  { title: "Jump Start",         blurb: "Dead battery? We’ll get you moving.",             href: "/services", icon: "🔋" },
  { title: "Tyre Change",        blurb: "On-site spare changes & assistance.",             href: "/services", icon: "🛞" },
];

export default function ServicesGrid() {
  return (
    <section className="container-1300 section-space">
      <header className="section-head">
        <h2 style={{ fontSize: "clamp(26px,3vw,36px)", margin: 0 }}>Popular services</h2>
        <Link className="btn btn-outline" href="/services">View all services</Link>
      </header>

      <div className="cards-grid-xl" role="list">
        {SERVICES.map((s) => (
          <article key={s.title} role="listitem" className="card-xl">
            <span className="card-glow" aria-hidden="true" />

            <div className="card-top">
              <span className="card-icon" aria-hidden="true">{s.icon}</span>
              <span className="card-kicker">24/7 available</span>
            </div>

            <h3 className="card-title-xl">
              <Link href={s.href} className="link-inline">{s.title}</Link>
            </h3>
            <p className="card-blurb">{s.blurb}</p>

            <div className="card-cta-row">
              <Link href={s.href} className="link-inline">Learn more →</Link>
              <span className="pill pill-soft">Fast ETA</span>
            </div>

            <div className="card-bottom">
              <Link className="btn btn-sm" href="/contact">Get Help</Link>
              <a className="btn btn-outline btn-sm" href="tel:+440000000000">Call Now</a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
