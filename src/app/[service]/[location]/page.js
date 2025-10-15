// app/[service]/[location]/page.js
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

export const revalidate = 60; // ISR: refresh every 60s

// ---------- Pre-render only pages that exist in DB ----------
export async function generateStaticParams() {
  const rows = await prisma.page.findMany({
    include: {
      service: { select: { slug: true } },
      location: { select: { slug: true } },
    },
    where: { published: true },
  });

  return rows.map((r) => ({
    service: r.service.slug,
    location: r.location.slug,
  }));
}

// ---------- SEO / Metadata ----------
export async function generateMetadata({ params }) {
  const page = await prisma.page.findFirst({
    where: {
      published: true,
      service: { slug: params.service },
      location: { slug: params.location },
    },
    include: { service: true, location: true },
  });

  if (!page) {
    return { title: "Not found" };
  }

  const sLabel = page.service.name;
  const lLabel = page.location.name;

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
export default async function LocationPage({ params }) {
  const page = await prisma.page.findFirst({
    where: {
      published: true,
      service: { slug: params.service },
      location: { slug: params.location },
    },
    include: { service: true, location: true },
  });

  if (!page) notFound();

  const sLabel = page.service.name;
  const lLabel = page.location.name;

  return (
    <section className="container-1300" style={{ padding: "32px 0 48px" }}>
      {/* HERO */}
      <header style={{ marginBottom: 18 }}>
        <p className="hero-kicker">24/7 {sLabel}</p>
        <h1 className="hero-title" style={{ margin: 0 }}>
          {page.title || `${sLabel} in ${lLabel} — fast, reliable, affordable`}
        </h1>
        <p className="hero-sub">
          Stranded in {lLabel}? Our local team provides {sLabel.toLowerCase()},
          roadside assistance, tyre change, jump start and more. Average ETA ~ 30–45 minutes.
        </p>
        <div className="hero-ctas">
          <a href="tel:+440000000000" className="btn">Call Now</a>
          <Link href="/contact" className="btn btn-outline">Book Online</Link>
        </div>
      </header>

      {/* Optional custom content from DB */}
      {page.content && page.content.trim() !== "" && (
        <div style={{ marginBottom: 24 }}>
          <p style={{ whiteSpace: "pre-wrap" }}>{page.content}</p>
        </div>
      )}

      {/* TRUST ROW */}
      <div className="hero-trust" style={{ marginBottom: 24 }}>
        <div className="pill">✅ Fully insured</div>
        <div className="pill">🕑 24/7 dispatch</div>
        <div className="pill">📍 Local to {lLabel}</div>
      </div>

      {/* SERVICES GRID */}
      <div
        style={{
          display: "grid",
          gap: 16,
          gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
          marginBottom: 28,
        }}
      >
        {[
          "Breakdown Recovery",
          "Accident Recovery",
          "Flatbed Towing",
          "Motorway Recovery",
          "Jump Start",
          "Tyre Change",
        ].map((item) => (
          <div
            key={item}
            style={{ border: "1px solid #e5e7eb", borderRadius: 12, padding: 16 }}
          >
            <h3 style={{ margin: "0 0 8px" }}>{item}</h3>
            <p className="muted" style={{ margin: 0 }}>
              Fast help in {lLabel}. Upfront pricing.
            </p>
          </div>
        ))}
      </div>

      {/* INTERNAL LINKS */}
      <hr style={{ margin: "28px 0" }} />
      <LinksForContext
        serviceSlug={params.service}
        locationSlug={params.location}
        sLabel={sLabel}
        lLabel={lLabel}
      />

      {/* LocalBusiness schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AutomotiveBusiness",
            name: "Next Towing",
            areaServed: lLabel,
            url: `https://your-domain.com/${params.service}/${params.location}`,
            telephone: "+44 0000 000000",
            sameAs: [
              "https://facebook.com/yourbrand",
              "https://x.com/yourbrand",
            ],
          }),
        }}
      />
    </section>
  );
}

// ---------- Helper (server component) ----------
async function LinksForContext({ serviceSlug, locationSlug, sLabel, lLabel }) {
  const [services, locations] = await Promise.all([
    prisma.service.findMany({ orderBy: { name: "asc" } }),
    prisma.location.findMany({ orderBy: { name: "asc" } }),
  ]);

  return (
    <nav style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
      {services.map((s) => (
        <Link key={s.id} className="pill" href={`/${s.slug}/${locationSlug}`}>
          {s.name} in {lLabel}
        </Link>
      ))}
      {locations
        .filter((l) => l.slug !== locationSlug)
        .map((l) => (
          <Link key={l.id} className="pill" href={`/${serviceSlug}/${l.slug}`}>
            {sLabel} in {l.name}
          </Link>
        ))}
    </nav>
  );
}
