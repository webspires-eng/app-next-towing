import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import ServiceForm from "@/components/admin/ServiceForm";
import { saveUploadedImage } from "@/lib/save-uploaded-image";

export const runtime = "nodejs";

const slugify = (value) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

async function createService(formData) {
  "use server";
  const title = String(formData.get("title") || "").trim();
  const customSlug = String(formData.get("slug") || "").trim();
  const slug = slugify(customSlug || title);
  const description = String(formData.get("description") || "");
  const excerpt = String(formData.get("excerpt") || "");
  const metaTitle = String(formData.get("metaTitle") || "");
  const metaDescription = String(formData.get("metaDescription") || "");
  const featuredImageFile = formData.get("featuredImage");
  const existingImage = String(formData.get("existingImage") || "");

  if (!title || !slug) return;

  let featuredImage = existingImage;
  if (featuredImageFile instanceof File && featuredImageFile.size > 0) {
    const savedPath = await saveUploadedImage(featuredImageFile, slug, "services");
    if (savedPath) {
      featuredImage = savedPath;
    }
  }

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
      <ServiceForm
        action={createService}
        submitLabel="Create service"
        headline="Create Service"
        subheading="Add a new towing or recovery service to power your landing pages."
        backHref="/dashboard/services"
      />
    </section>
  );
}
