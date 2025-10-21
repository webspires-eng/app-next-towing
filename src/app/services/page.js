import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const revalidate = 60;

export const metadata = {
  title: "Vehicle Recovery Services | Next Towing",
  description:
    "Browse all towing and roadside assistance services from Next Towing. Fixed pricing, 24/7 dispatch, and insured drivers across Greater Manchester.",
};

export default async function ServicesIndex() {
  const services = await prisma.service.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <div className="bg-black text-white">
      <section className="flex justify-center border-b border-white/10 bg-neutral-950/80 py-20">
        <div className="container-1300 w-full px-4">
          <header className="mx-auto max-w-3xl text-center">
            <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-yellow-400/40 bg-yellow-400/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-yellow-300">
              Services
            </span>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              All vehicle recovery &amp; transport services
            </h1>
            <p className="mt-4 text-white/70">
              Every option is backed by our 24/7 control centre, PAS43 compliant operators, and modern low-loader fleet.
              Choose a service to explore coverage areas and request assistance.
            </p>
          </header>
        </div>
      </section>

      <section className="flex justify-center bg-black py-16">
        <div className="container-1300 w-full px-4">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <Link
                key={service.id}
                href={`/services/${service.slug}`}
                className="group flex h-full flex-col justify-between rounded-2xl border border-white/10 bg-neutral-900/70 p-6 text-white shadow-[0_18px_44px_rgba(0,0,0,0.45)] transition-transform duration-200 hover:-translate-y-1 hover:border-yellow-300/50 hover:shadow-[0_26px_60px_rgba(0,0,0,0.55)]"
              >
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-yellow-300">Service</p>
                  <h2 className="mt-3 text-2xl font-semibold">{service.name}</h2>
                  <p className="mt-3 text-sm text-white/70">
                    View all locations we cover for {service.name.toLowerCase()}. Fixed upfront quotes and ETA tracking on
                    every job.
                  </p>
                </div>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-yellow-300 transition-colors group-hover:text-yellow-200">
                  Explore coverage
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
        </div>
      </section>
    </div>
  );
}
