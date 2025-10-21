import Link from "next/link";
import { prisma } from "@/lib/prisma";

const hasDatabase = Boolean(process.env.DATABASE_URL);

export const revalidate = 60;

export const metadata = {
  title: "All Areas | Next Towing",
  description: "Browse all locations we cover for towing and car recovery."
};

export default async function AreasIndex() {
  if (!hasDatabase) {
    return (
      <section className="container-1300" style={{ padding: "28px 0 40px" }}>
        <h1>Areas We Cover</h1>
        <p className="muted" style={{ marginTop: 16 }}>
          Connect a database to list specific coverage areas. Until then, call our 24/7 team to confirm availability in your
          location.
        </p>
      </section>
    );
  }

  const locations = await prisma.location.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <section className="container-1300" style={{ padding: "28px 0 40px" }}>
      <h1>Areas We Cover</h1>
      <div style={{ display:"grid", gap:16, gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))" }}>
        {locations.map(l => (
          <Link key={l.id} href={`/areas/${l.slug}`}
            style={{border:"1px solid #e5e7eb", borderRadius:12, padding:16, textDecoration:"none", color:"inherit"}}>
            <h3 style={{margin:"0 0 6px"}}>{l.name}</h3>
            <p className="muted" style={{margin:0}}>View services available in {l.name}.</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
