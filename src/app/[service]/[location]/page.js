// app/[service]/[location]/page.js
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

export const revalidate = 60; // ISR: refresh every 60s

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
    <div className="bg-black text-white">
      <section className="relative flex justify-center overflow-hidden py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(250,204,21,0.18),transparent_55%),radial-gradient(circle_at_bottom_right,rgba(250,204,21,0.12),transparent_60%)]" />
        <div className="container-1300 relative z-10 w-full px-4">
          <header className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-yellow-400/40 bg-yellow-400/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-yellow-300">
              24/7 {sLabel}
            </span>
            <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
              {page.title || `${sLabel} in ${lLabel} — fast, reliable, affordable`}
            </h1>
            <p className="mt-4 text-white/70">
              Stranded in {lLabel}? Our local team provides {sLabel.toLowerCase()}, roadside assistance, tyre change,
              jump start and more. Average ETA ~ 30–45 minutes.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="tel:+440000000000"
                className="inline-flex items-center justify-center rounded-full bg-yellow-300 px-6 py-3 text-sm font-semibold text-black shadow-[0_18px_40px_rgba(250,204,21,0.35)] transition-colors hover:bg-yellow-200"
              >
                Call now
              </a>
              <Link
                href="/booking"
                className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-yellow-300/60 hover:bg-yellow-300/10"
              >
                Book online
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-3 text-sm text-white/60">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
                ✅ Fully insured
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
                🕑 Avg arrival 30–45 mins
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
                📍 Local to {lLabel}
              </span>
            </div>
          </header>
        </div>
      </section>

      {page.content && page.content.trim() !== "" && (
        <section className="flex justify-center border-t border-white/10 bg-neutral-950/80 py-16">
          <div className="container-1300 w-full px-4">
            <div className="mx-auto max-w-3xl whitespace-pre-line text-base leading-relaxed text-white/70">
              {page.content}
            </div>
          </div>
        </section>
      )}

      <section className="flex justify-center bg-black py-16">
        <div className="container-1300 w-full px-4">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {["Breakdown Recovery", "Accident Recovery", "Flatbed Towing", "Motorway Recovery", "Jump Start", "Tyre Change"].map(
              (item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-neutral-900/70 p-6 text-white shadow-[0_18px_44px_rgba(0,0,0,0.45)]"
                >
                  <h3 className="text-lg font-semibold">{item}</h3>
                  <p className="mt-2 text-sm text-white/70">Fast help in {lLabel}. Upfront pricing.</p>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      <LinksForContext
        serviceSlug={params.service}
        locationSlug={params.location}
        sLabel={sLabel}
        lLabel={lLabel}
      />

      <section className="flex justify-center border-t border-white/10 bg-neutral-950/90 py-12">
        <div className="container-1300 w-full px-4 text-xs text-white/50">
          <p>
            Average arrival times depend on traffic, weather, and live demand. If you are on a motorway, move behind the
            barrier if safe and call our emergency line immediately.
          </p>
        </div>
      </section>

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
    </div>
  );
}

async function LinksForContext({ serviceSlug, locationSlug, sLabel, lLabel }) {
  const [services, locations] = await Promise.all([
    prisma.service.findMany({ orderBy: { name: "asc" } }),
    prisma.location.findMany({ orderBy: { name: "asc" } }),
  ]);

  return (
    <section className="flex justify-center border-t border-white/10 bg-neutral-950/80 py-20">
      <div className="container-1300 w-full px-4">
        <div className="grid gap-10 lg:grid-cols-[1fr,1.1fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-yellow-400/40 bg-yellow-400/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-yellow-300">
              Continue planning
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">Compare other services &amp; towns</h2>
            <p className="mt-4 text-white/70">
              Browse more recovery options or different locations. We share availability across our network to minimise
              wait times for every caller.
            </p>
          </div>
          <div className="grid gap-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-yellow-300">Other services in {lLabel}</p>
              <div className="mt-3 flex flex-wrap gap-3">
                {services.map((service) => (
                  <Link
                    key={service.id}
                    href={`/${service.slug}/${locationSlug}`}
                    className="inline-flex items-center rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-white transition-colors hover:border-yellow-300/60 hover:bg-yellow-300/10"
                  >
                    {service.name}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-yellow-300">{sLabel} in other locations</p>
              <div className="mt-3 flex flex-wrap gap-3">
                {locations
                  .filter((location) => location.slug !== locationSlug)
                  .map((location) => (
                    <Link
                      key={location.id}
                      href={`/${serviceSlug}/${location.slug}`}
                      className="inline-flex items-center rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-white transition-colors hover:border-yellow-300/60 hover:bg-yellow-300/10"
                    >
                      {location.name}
                    </Link>
                  ))}
              </div>
            </div>
            <div>
              <Link
                href="/booking"
                className="inline-flex w-full items-center justify-center rounded-full bg-yellow-300 px-6 py-3 text-sm font-semibold text-black shadow-[0_18px_40px_rgba(250,204,21,0.35)] transition-colors hover:bg-yellow-200"
              >
                Start a booking request
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
