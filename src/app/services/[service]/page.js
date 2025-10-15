import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

export const revalidate = 60;

export async function generateStaticParams() {
  const all = await prisma.service.findMany({ select: { slug: true } });
  return all.map(s => ({ service: s.slug }));
}

export async function generateMetadata({ params }) {
  const svc = await prisma.service.findUnique({ where: { slug: params.service } });
  if (!svc) return { title: "Service not found" };
  return {
    title: `${svc.name} — Areas We Cover | Next Towing`,
    description: `See all areas covered for ${svc.name.toLowerCase()}.`,
  };
}

export default async function ServiceArchive({ params }) {
  const svc = await prisma.service.findUnique({
    where: { slug: params.service },
  });
  if (!svc) notFound();

  // locations that actually have a published page for this service
  const pages = await prisma.page.findMany({
    where: { serviceId: svc.id, published: true },
    include: { location: true },
    orderBy: { location: { name: "asc" } },
  });

  return (
    <section className="container-1300" style={{ padding: "28px 0 40px" }}>
      <h1>{svc.name} — Areas We Cover</h1>

      <div style={{ display:"grid", gap:16, gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))" }}>
        {pages.map(p => (
          <Link key={p.id} href={`/${params.service}/${p.location.slug}`}
            style={{border:"1px solid #e5e7eb", borderRadius:12, padding:16, textDecoration:"none", color:"inherit"}}>
            <h3 style={{margin:"0 0 6px"}}>{p.location.name}</h3>
            <p className="muted" style={{margin:0}}>
              {svc.name} in {p.location.name}
            </p>
          </Link>
        ))}
      </div>

      <hr style={{margin:"28px 0"}}/>
      <Link className="btn btn-outline" href="/services">← All services</Link>
    </section>
  );
}
