import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { revalidatePath } from "next/cache";

export const runtime = "nodejs";

async function removeLocation(formData) {
  "use server";
  const id = String(formData.get("id") || "");
  if (!id) return;
  try { await prisma.location.delete({ where: { id } }); } catch {}
  revalidatePath("/dashboard/locations");
}

export default async function LocationsList() {
  const rows = await prisma.location.findMany({ orderBy: { name: "asc" } });
  return (
    <section>
      <header className="section-head">
        <h1 style={{margin:0}}>Locations</h1>
        <Link href="/dashboard/locations/new" className="btn">New</Link>
      </header>
      <div style={{display:"grid",gap:12}}>
        {rows.map(r => (
          <article key={r.id} className="card" style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div>
              <div style={{fontWeight:600}}>{r.name}</div>
              <div className="muted" style={{fontSize:14}}>/{r.slug} • {r.type}</div>
            </div>
            <form action={removeLocation}>
              <input type="hidden" name="id" value={r.id} />
              <button className="btn btn-outline" type="submit">Delete</button>
            </form>
          </article>
        ))}
        {rows.length === 0 && <p className="muted">No locations yet.</p>}
      </div>
    </section>
  );
}
