import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

const hasDatabase = Boolean(process.env.DATABASE_URL);

export const revalidate = 60;

export async function generateStaticParams() {
  if (!hasDatabase) return [];
  const all = await prisma.service.findMany({ select: { slug: true } });
  return all.map((s) => ({ service: s.slug }));
}

export async function generateMetadata({ params }) {
  if (!hasDatabase) {
    const fallbackName = formatSlug(params.service);
    return {
      title: `${fallbackName} — Areas We Cover | Next Towing`,
      description: `See all areas covered for ${fallbackName.toLowerCase()}.`,
    };
  }

  const svc = await prisma.service.findUnique({ where: { slug: params.service } });
  if (!svc) return { title: "Service not found" };
  return {
    title: `${svc.name} — Areas We Cover | Next Towing`,
    description: `See all areas covered for ${svc.name.toLowerCase()}.`,
  };
}

export default async function ServiceArchive({ params }) {
  if (!hasDatabase) {
    const label = formatSlug(params.service);
    return (
      <section className="container-1300" style={{ padding: "28px 0 40px" }}>
        <h1>{label} — Areas We Cover</h1>
        <p className="muted" style={{ marginTop: 16 }}>
          Detailed service coverage pages require a configured database connection.
        </p>
        <hr style={{ margin: "28px 0" }} />
        <Link className="btn btn-outline" href="/services">
          ← All services
        </Link>
      </section>
    );
  }

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

      <div style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))" }}>
        {pages.map((p) => (
          <Link
            key={p.id}
            href={`/${params.service}/${p.location.slug}`}
            style={{ border: "1px solid #e5e7eb", borderRadius: 12, padding: 16, textDecoration: "none", color: "inherit" }}
          >
            <h3 style={{ margin: "0 0 6px" }}>{p.location.name}</h3>
            <p className="muted" style={{ margin: 0 }}>
              {svc.name} in {p.location.name}
            </p>
          </Link>
        ))}
      </div>

      <hr style={{ margin: "28px 0" }} />
      <Link className="btn btn-outline" href="/services">
        ← All services
      </Link>
    </section>
  );
}

function formatSlug(slug = "") {
  return decodeURIComponent(slug)
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}
