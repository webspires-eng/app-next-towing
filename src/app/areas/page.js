import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const revalidate = 60;

export const metadata = {
  title: "Areas We Cover | Next Towing",
  description:
    "See every Greater Manchester and North West location covered by Next Towing for emergency vehicle recovery and transport.",
};

export default async function AreasIndex() {
  const locations = await prisma.location.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <div className="bg-black text-white">
      <section className="flex justify-center border-b border-white/10 bg-neutral-950/80 py-20">
        <div className="container-1300 w-full px-4">
          <header className="mx-auto max-w-3xl text-center">
            <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-yellow-400/40 bg-yellow-400/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-yellow-300">
              Coverage map
            </span>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Areas we cover across the North West</h1>
            <p className="mt-4 text-white/70">
              We dispatch local recovery units from Manchester, Salford, Stockport, Bolton, Wigan, and beyond. Select your
              location to view services and book immediate assistance.
            </p>
          </header>
        </div>
      </section>

      <section className="flex justify-center bg-black py-16">
        <div className="container-1300 w-full px-4">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {locations.map((location) => (
              <Link
                key={location.id}
                href={`/areas/${location.slug}`}
                className="group flex h-full flex-col justify-between rounded-2xl border border-white/10 bg-neutral-900/70 p-6 text-white shadow-[0_18px_44px_rgba(0,0,0,0.45)] transition-transform duration-200 hover:-translate-y-1 hover:border-yellow-300/50 hover:shadow-[0_26px_60px_rgba(0,0,0,0.55)]"
              >
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-yellow-300">Location</p>
                  <h2 className="mt-3 text-2xl font-semibold">{location.name}</h2>
                  <p className="mt-3 text-sm text-white/70">
                    Discover services available in {location.name}. Rapid response teams stationed nearby for faster ETAs.
                  </p>
                </div>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-yellow-300 transition-colors group-hover:text-yellow-200">
                  View services
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
