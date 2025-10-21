import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export const runtime = "nodejs";
const slugify = s => s.toLowerCase().trim().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,"");

async function createService(formData) {
  "use server";
  const title = String(formData.get("title") || "").trim();
  const customSlug = String(formData.get("slug") || "").trim();
  const slug = slugify(customSlug || title);
  const description = String(formData.get("description") || "").trim();
  const excerpt = String(formData.get("excerpt") || "").trim();
  const metaTitle = String(formData.get("metaTitle") || "").trim();
  const metaDescription = String(formData.get("metaDescription") || "").trim();
  const featuredImage = String(formData.get("featuredImage") || "").trim();

  if (!title || !slug) return;

  try {
    await prisma.service.create({
      data: {
        name: title,
        slug,
        description,
        excerpt,
        metaTitle,
        metaDescription,
        featuredImage,
      },
    });
  } catch (error) {
    console.error("Failed to create service", error);
    return;
  }

  revalidatePath("/dashboard/services");
  redirect("/dashboard/services");
}

export default function NewService() {
  return (
    <section className="container-1300 section-space">
      <h1 className="text-3xl font-semibold text-[#0E172B]">Create Service</h1>
      <form action={createService} style={{display:"grid",gap:16,maxWidth:560}} className="mt-8 bg-white p-6 shadow-lg rounded-2xl border border-[#0E172B]/10">
        <label>
          <div className="mb-2 font-semibold text-[#0E172B]">Title</div>
          <input name="title" required className="input" placeholder="Vehicle Recovery" />
        </label>
        <label>
          <div className="mb-2 font-semibold text-[#0E172B]">Slug</div>
          <input name="slug" className="input" placeholder="vehicle-recovery" />
          <p className="mt-1 text-sm text-[#0E172B]/60">Leave blank to generate automatically.</p>
        </label>
        <label>
          <div className="mb-2 font-semibold text-[#0E172B]">Excerpt</div>
          <textarea name="excerpt" rows={3} className="input" placeholder="Short summary shown on listings." />
        </label>
        <label>
          <div className="mb-2 font-semibold text-[#0E172B]">Description</div>
          <textarea name="description" rows={6} className="input" placeholder="Full description of the service." />
        </label>
        <label>
          <div className="mb-2 font-semibold text-[#0E172B]">Meta title</div>
          <input name="metaTitle" className="input" placeholder="Vehicle Recovery | Next Towing" />
        </label>
        <label>
          <div className="mb-2 font-semibold text-[#0E172B]">Meta description</div>
          <textarea name="metaDescription" rows={3} className="input" placeholder="SEO description for search engines." />
        </label>
        <label>
          <div className="mb-2 font-semibold text-[#0E172B]">Featured image URL</div>
          <input name="featuredImage" className="input" placeholder="https://example.com/image.jpg" />
        </label>
        <button className="btn" type="submit">Save service</button>
      </form>
    </section>
  );
}
