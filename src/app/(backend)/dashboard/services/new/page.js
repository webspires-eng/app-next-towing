import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

const hasDatabase = Boolean(process.env.DATABASE_URL);

export const runtime = "nodejs";
const slugify = s => s.toLowerCase().trim().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,"");

async function createService(formData) {
  "use server";
  const name = String(formData.get("name") || "").trim();
  const slug = slugify(name || String(formData.get("slug") || ""));
  if (!name || !slug) return;
  if (!hasDatabase) return;
  try { await prisma.service.create({ data: { name, slug } }); } catch {}
  redirect("/dashboard/services");
}

export default function NewService() {
  if (!hasDatabase) {
    return (
      <section className="container-1300 section-space">
        <h1>Create Service</h1>
        <p className="muted">Database connection required to manage service catalogue.</p>
      </section>
    );
  }

  return (
    <section className="container-1300 section-space">
      <h1>Create Service</h1>
      <form action={createService} style={{display:"grid",gap:12,maxWidth:420}}>
        <label>
          <div>Name</div>
          <input name="name" required className="input" placeholder="Towing" />
        </label>
        <button className="btn" type="submit">Save</button>
        <p className="muted" style={{fontSize:12}}>Slug is auto-generated from the name.</p>
      </form>
    </section>
  );
}
