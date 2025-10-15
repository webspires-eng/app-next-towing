import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

export const revalidate = 60;

export async function generateStaticParams() {
  const all = await prisma.location.findMany({ select: { slug: true } });
  return all.map(l => ({ location: l.slug }));
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

  // services that actually have a published page for this location
  const pages = await prisma.page.findMany({
    where: { locationId: loc.id, published: true },
    include: { service: true },
    orderBy: { service: { name: "asc" } },
  });

  return (
    <section className="container-1300" style={{ padding: "28px 0 40px" }}>
      <h1>{loc.name} — Services</h1>

      <div style={{ display:"grid", gap:16, gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))" }}>
        {pages.map(p => (
          <Link key={p.id} href={`/${p.service.slug}/${params.location}`}
            style={{border:"1px solid #e5e7eb", borderRadius:12, padding:16, textDecoration:"none", color:"inherit"}}>
            <h3 style={{margin:"0 0 6px"}}>{p.service.name}</h3>
            <p className="muted" style={{margin:0}}>
              {p.service.name} in {loc.name}
            </p>
          </Link>
        ))}
      </div>

      <hr style={{margin:"28px 0"}}/>
      <Link className="btn btn-outline" href="/areas">← All areas</Link>
    </section>
  );
}
