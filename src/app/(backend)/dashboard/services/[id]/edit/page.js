import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import ServiceForm from "@/components/admin/ServiceForm";
import { saveUploadedImage } from "@/lib/save-uploaded-image";

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
  const description = String(formData.get("description") || "");
  const excerpt = String(formData.get("excerpt") || "").trim();
  const metaTitle = String(formData.get("metaTitle") || "").trim();
  const metaDescription = String(formData.get("metaDescription") || "").trim();
  const existingImage = String(formData.get("existingImage") || "").trim();
  const featuredImageFile = formData.get("featuredImage");

  if (!title || !slug) return;

  let featuredImage = existingImage;
  if (featuredImageFile instanceof File && featuredImageFile.size > 0) {
    const savedPath = await saveUploadedImage(featuredImageFile, slug, "services");
    if (savedPath) {
      featuredImage = savedPath;
    }
  }

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
      <ServiceForm
        action={updateService}
        submitLabel="Save changes"
        serviceId={service.id}
        initialData={{
          title: service.name,
          slug: service.slug,
          excerpt: service.excerpt,
          description: service.description,
          metaTitle: service.metaTitle,
          metaDescription: service.metaDescription,
          featuredImage: service.featuredImage,
        }}
        headline="Edit Service"
        subheading="Update copy, SEO, and media for this recovery service."
        backHref="/dashboard/services"
      />
    </section>
  );
}
