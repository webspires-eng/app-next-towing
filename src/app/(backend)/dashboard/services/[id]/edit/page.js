import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

const slugify = (s) =>
  s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

async function updateService(formData) {
  "use server";
  const id = String(formData.get("id") || "");
  if (!id) return;

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
    await prisma.service.update({
      where: { id },
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
    console.error("Failed to update service", error);
    return;
  }

  revalidatePath("/dashboard/services");
  redirect("/dashboard/services");
}

export default async function EditService({ params }) {
  const service = await prisma.service.findUnique({
    where: { id: params.id },
  });

  if (!service) {
    notFound();
  }

  return (
    <section className="container-1300 section-space">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold text-[#0E172B]">Edit Service</h1>
        <Link href="/dashboard/services" className="text-sm font-semibold text-[#0E172B]/70 hover:text-[#0E172B]">
          Back to list
        </Link>
      </div>

      <form
        action={updateService}
        className="mt-8 grid max-w-3xl gap-6 rounded-2xl border border-[#0E172B]/10 bg-white p-6 shadow-lg"
      >
        <input type="hidden" name="id" value={service.id} />

        <label>
          <div className="mb-2 font-semibold text-[#0E172B]">Title</div>
          <input name="title" defaultValue={service.name} required className="input" />
        </label>

        <label>
          <div className="mb-2 font-semibold text-[#0E172B]">Slug</div>
          <input name="slug" defaultValue={service.slug} className="input" />
          <p className="mt-1 text-sm text-[#0E172B]/60">Leave blank to regenerate from the title.</p>
        </label>

        <label>
          <div className="mb-2 font-semibold text-[#0E172B]">Excerpt</div>
          <textarea
            name="excerpt"
            rows={3}
            defaultValue={service.excerpt}
            className="input"
            placeholder="Short summary shown on listings."
          />
        </label>

        <label>
          <div className="mb-2 font-semibold text-[#0E172B]">Description</div>
          <textarea
            name="description"
            rows={6}
            defaultValue={service.description}
            className="input"
            placeholder="Full description of the service."
          />
        </label>

        <label>
          <div className="mb-2 font-semibold text-[#0E172B]">Meta title</div>
          <input name="metaTitle" defaultValue={service.metaTitle} className="input" />
        </label>

        <label>
          <div className="mb-2 font-semibold text-[#0E172B]">Meta description</div>
          <textarea
            name="metaDescription"
            rows={3}
            defaultValue={service.metaDescription}
            className="input"
            placeholder="SEO description for search engines."
          />
        </label>

        <label>
          <div className="mb-2 font-semibold text-[#0E172B]">Featured image URL</div>
          <input name="featuredImage" defaultValue={service.featuredImage} className="input" />
        </label>

        <div className="flex items-center gap-3 pt-2">
          <button type="submit" className="btn">
            Save changes
          </button>
          <Link
            href="/dashboard/services"
            className="text-sm font-semibold text-[#0E172B]/70 hover:text-[#0E172B]"
          >
            Cancel
          </Link>
        </div>
      </form>
    </section>
  );
}
