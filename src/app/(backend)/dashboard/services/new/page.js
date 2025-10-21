import { prisma } from "@/lib/prisma";
import { databaseConfigured } from "@/lib/env";
import { redirect } from "next/navigation";

export const runtime = "nodejs";
const slugify = s => s.toLowerCase().trim().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,"");

async function createService(formData) {
  "use server";
  if (!databaseConfigured) {
    console.warn("DATABASE_URL not set – skipping service create.");
    return;
  }
  const name = String(formData.get("name") || "").trim();
  const slug = slugify(name || String(formData.get("slug") || ""));
  if (!name || !slug) return;
  try { await prisma.service.create({ data: { name, slug } }); } catch {}
  redirect("/dashboard/services");
}

export default function NewService() {
  if (!databaseConfigured) {
    return (
      <section className="container-1300 section-space">
        <h1>Create Service</h1>
        <p className="muted">
          Configure <code>DATABASE_URL</code> to add new services.
        </p>
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
