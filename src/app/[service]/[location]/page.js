import Link from "next/link";
import { SERVICES, LOCATIONS, displayLocation } from "@/data/locations";

// ---------- Static generation ----------
export async function generateStaticParams() {
  const params = [];
  for (const s of SERVICES) {
    for (const l of LOCATIONS) {
      params.push({ service: s.slug, location: l.slug });
    }
  }
  return params;
}

// ---------- SEO / Metadata ----------
export async function generateMetadata({ params }) {
  const service = SERVICES.find(s => s.slug === params.service);
  const location = LOCATIONS.find(l => l.slug === params.location);
  const sLabel = service?.label || "Service";
  const lLabel = displayLocation(location || { label: params.location.toUpperCase() });

  const title = `${sLabel} ${lLabel} | 24/7 Rapid Response • Next Towing`;
  const description = `Need ${sLabel.toLowerCase()} in ${lLabel}? 24/7 dispatch, fast ETAs, fixed pricing, insured drivers. Call now for immediate help.`;
  const url = `https://your-domain.com/${params.service}/${params.location}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "website" },
  };
}

// ---------- Page ----------
export default function LocationPage({ params }) {
  const service = SERVICES.find(s => s.slug === params.service);
  const location = LOCATIONS.find(l => l.slug === params.location);

  if (!service || !location) return <div className="container-1300" style={{padding:"40px 0"}}>Not found</div>;

  const sLabel = service.label;
  const lLabel = displayLocation(location);

  return (
    <section className="container-1300" style={{ padding: "32px 0 48px" }}>
      {/* HERO */}
      <header style={{ marginBottom: 18 }}>
        <p className="hero-kicker">24/7 {sLabel}</p>
        <h1 className="hero-title" style={{ margin: 0 }}>
          {sLabel} in {lLabel} — fast, reliable, affordable
        </h1>
        <p className="hero-sub">
          Stranded in {lLabel}? Our local team provides {sLabel.toLowerCase()}, roadside assistance, tyre change, jump start and more. Average ETA ~ 30–45 minutes.
        </p>
        <div className="hero-ctas">
          <a href="tel:+440000000000" className="btn">Call Now</a>
          <Link href="/contact" className="btn btn-outline">Book Online</Link>
        </div>
      </header>

      {/* TRUST ROW */}
      <div className="hero-trust" style={{ marginBottom: 24 }}>
        <div className="pill">✅ Fully insured</div>
        <div className="pill">🕑 24/7 dispatch</div>
        <div className="pill">📍 Local to {lLabel}</div>
      </div>

      {/* SERVICES GRID */}
      <div style={{ display:"grid", gap:16, gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))", marginBottom: 28 }}>
        {[
          "Breakdown Recovery", "Accident Recovery", "Flatbed Towing",
          "Motorway Recovery", "Jump Start", "Tyre Change"
        ].map((item)=>(
          <div key={item} style={{border:"1px solid #e5e7eb", borderRadius:12, padding:16}}>
            <h3 style={{margin:"0 0 8px"}}>{item}</h3>
            <p className="muted" style={{margin:0}}>Fast help in {lLabel}. Upfront pricing.</p>
          </div>
        ))}
      </div>

      {/* COPY BLOCK (SEO-friendly) */}
      <section style={{ display:"grid", gap:14, marginBottom:28 }}>
        <h2>Why choose us for {sLabel.toLowerCase()} in {lLabel}?</h2>
        <ul style={{margin:0, paddingLeft:18}}>
          <li>Rapid ETA, live driver tracking</li>
          <li>Fixed, transparent prices before dispatch</li>
          <li>Experienced, fully insured operators</li>
          <li>Local knowledge across {lLabel} and nearby areas</li>
        </ul>
      </section>

      {/* FAQ */}
      <section>
        <h2>FAQs — {sLabel} {lLabel}</h2>
        <details><summary>How fast can you reach me?</summary><p>Average ETA is 30–45 minutes, depending on traffic and location.</p></details>
        <details><summary>Do you cover motorways like M60?</summary><p>Yes, our team handles breakdowns and recovery on M60 and surrounding routes.</p></details>
        <details><summary>What vehicles do you tow?</summary><p>Cars, SUVs, vans, and motorcycles. For special vehicles, call us first.</p></details>
      </section>

      {/* INTERNAL LINKS (help bots & users) */}
      <hr style={{margin:"28px 0"}}/>
      <nav style={{ display:"flex", flexWrap:"wrap", gap:10 }}>
        {SERVICES.map(s => (
          <Link key={s.slug} className="pill" href={`/${s.slug}/${params.location}`}>
            {s.label} in {lLabel}
          </Link>
        ))}
        {LOCATIONS.filter(l=>l.slug!==params.location).map(l => (
          <Link key={l.slug} className="pill" href={`/${params.service}/${l.slug}`}>
            {sLabel} in {displayLocation(l)}
          </Link>
        ))}
      </nav>

      {/* LocalBusiness schema */}
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context":"https://schema.org",
            "@type":"AutomotiveBusiness",
            name:"Next Towing",
            areaServed: lLabel,
            url:`https://your-domain.com/${params.service}/${params.location}`,
            telephone:"+44 0000 000000",
            sameAs:["https://facebook.com/yourbrand","https://x.com/yourbrand"]
          })
        }}
      />
    </section>
  );
}
