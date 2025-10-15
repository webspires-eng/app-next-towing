import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export const runtime = "nodejs";
const slugify = s => s.toLowerCase().trim().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,"");

async function createLocation(formData) {
  "use server";
  const name = String(formData.get("name") || "").trim();
  const type = String(formData.get("type") || "CITY");
  const slug = slugify(name || String(formData.get("slug") || ""));
  if (!name || !slug) return;
  try { await prisma.location.create({ data: { name, slug, type } }); } catch {}
  redirect("/dashboard/locations");
}

export default function NewLocation() {
  return (
    <section className="container-1300 section-space">
      <h1>Create Location</h1>
      <form action={createLocation} style={{display:"grid",gap:12,maxWidth:480}}>
        <label>
          <div>Name</div>
          <input name="name" required className="input" placeholder="Manchester" />
        </label>
        <label>
          <div>Type</div>
          <select name="type" className="input">
            <option value="CITY">CITY</option>
            <option value="MOTORWAY">MOTORWAY</option>
          </select>
        </label>
        <button className="btn" type="submit">Save</button>
      </form>
    </section>
  );
}
