import Link from "next/link";
import { prisma } from "@/lib/prisma";

const hasDatabase = Boolean(process.env.DATABASE_URL);

export const revalidate = 60;

export const metadata = {
  title: "All Services | Next Towing",
  description: "Towing & car recovery services across all areas we cover.",
};

export default async function ServicesIndex() {
  if (!hasDatabase) {
    return (
      <section className="container-1300" style={{ padding: "28px 0 40px" }}>
        <h1>Services</h1>
        <p className="muted" style={{ marginTop: 16 }}>
          Connect a database to surface service-specific landing pages. Our dispatch team can still advise on coverage by phone.
        </p>
      </section>
    );
  }

  const services = await prisma.service.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <section className="container-1300" style={{ padding: "28px 0 40px" }}>
      <h1>Services</h1>
      <div style={{ display:"grid", gap:16, gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))" }}>
        {services.map(s => (
          <Link key={s.id} href={`/services/${s.slug}`}
            style={{border:"1px solid #e5e7eb", borderRadius:12, padding:16, textDecoration:"none", color:"inherit"}}>
            <h3 style={{margin:"0 0 6px"}}>{s.name}</h3>
            <p className="muted" style={{margin:0}}>View areas we cover for {s.name.toLowerCase()}.</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
