import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

export const revalidate = 60;

export async function generateStaticParams() {
  const all = await prisma.location.findMany({ select: { slug: true } });
  return all.map((l) => ({ location: l.slug }));
}

export async function generateMetadata({ params }) {
  const loc = await prisma.location.findUnique({ where: { slug: params.location } });
  if (!loc) return { title: "Area not found" };
  return {
    title: `${loc.name} — Services | Next Towing`,
    description: `See all towing & car recovery services available in ${loc.name}.`,
  };
}

export default async function LocationArchive({ params }) {
  const loc = await prisma.location.findUnique({
    where: { slug: params.location },
  });
  if (!loc) notFound();

  const pages = await prisma.page.findMany({
    where: { locationId: loc.id, published: true },
    include: { service: true },
    orderBy: { service: { name: "asc" } },
  });

  return (
    <div className="bg-black text-white">
      <section className="relative flex justify-center overflow-hidden py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(250,204,21,0.18),transparent_55%),radial-gradient(circle_at_bottom_right,rgba(250,204,21,0.12),transparent_60%)]" />
        <div className="container-1300 relative z-10 w-full px-4">
          <header className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-yellow-400/40 bg-yellow-400/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-yellow-300">
              Local coverage
            </span>
            <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">Recovery services in {loc.name}</h1>
            <p className="mt-4 text-white/70">
              Our on-call teams operate throughout {loc.name} with fast access to the motorway network. Select a service
              to learn more about average ETAs, pricing guidance, and how to request help.
            </p>
          </header>
        </div>
      </section>

      <section className="flex justify-center bg-black py-16">
        <div className="container-1300 w-full px-4">
          {pages.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {pages.map((p) => (
                <Link
                  key={p.id}
                  href={`/${p.service.slug}/${params.location}`}
                  className="group flex h-full flex-col justify-between rounded-2xl border border-white/10 bg-neutral-900/70 p-6 text-white shadow-[0_18px_44px_rgba(0,0,0,0.45)] transition-transform duration-200 hover:-translate-y-1 hover:border-yellow-300/50 hover:shadow-[0_26px_60px_rgba(0,0,0,0.55)]"
                >
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-yellow-300">{p.service.name}</p>
                    <h2 className="mt-3 text-xl font-semibold">{p.service.name} in {loc.name}</h2>
                    <p className="mt-3 text-sm text-white/70">
                      Local recovery specialists positioned near {loc.name} with 24/7 control centre support.
                    </p>
                  </div>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-yellow-300 transition-colors group-hover:text-yellow-200">
                    View service page
                    <svg
                      aria-hidden="true"
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.6"
                      viewBox="0 0 24 24"
                    >
                      <path d="M5 12h14" />
                      <path d="m13 6 6 6-6 6" />
                    </svg>
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-yellow-400/40 bg-yellow-400/10 p-8 text-center text-yellow-100">
              <h2 className="text-2xl font-semibold text-yellow-300">We&apos;re expanding coverage</h2>
              <p className="mt-3 text-sm text-white/80">
                Call our control centre on <a href="tel:+440000000000" className="font-semibold text-yellow-100 underline-offset-4 hover:underline">+44 0000 000000</a> and we&apos;ll arrange support from the nearest available team.
              </p>
            </div>
          )}
        </div>
      </section>

      <LinksForContext locationSlug={params.location} lLabel={loc.name} />
    </div>
  );
}

async function LinksForContext({ locationSlug, lLabel }) {
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
              Plan your recovery
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">Explore more options nearby</h2>
            <p className="mt-4 text-white/70">
              Discover other services or neighbouring towns we cover. We operate a shared dispatch system so your call is
              routed to the closest available expert.
            </p>
          </div>
          <div className="grid gap-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-yellow-300">All services</p>
              <div className="mt-3 flex flex-wrap gap-3">
                {services.map((service) => (
                  <Link
                    key={service.id}
                    href={`/${service.slug}/${locationSlug}`}
                    className="inline-flex items-center rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-white transition-colors hover:border-yellow-300/60 hover:bg-yellow-300/10"
                  >
                    {service.name} in {lLabel}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-yellow-300">Other locations</p>
              <div className="mt-3 flex flex-wrap gap-3">
                {locations
                  .filter((location) => location.slug !== locationSlug)
                  .map((location) => (
                    <Link
                      key={location.id}
                      href={`/areas/${location.slug}`}
                      className="inline-flex items-center rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-white transition-colors hover:border-yellow-300/60 hover:bg-yellow-300/10"
                    >
                      {location.name}
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
