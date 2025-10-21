import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { databaseConfigured } from "@/lib/env";

export const revalidate = 60;

export const metadata = {
  title: "All Services | Next Towing",
  description: "Towing & car recovery services across all areas we cover."
};

export default async function ServicesIndex() {
  if (!databaseConfigured) {
    return (
      <section className="container-1300" style={{ padding: "28px 0 40px" }}>
        <h1>Services</h1>
        <p className="muted" style={{ marginTop: 12 }}>
          Set <code>DATABASE_URL</code> to populate this directory from your content database.
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
