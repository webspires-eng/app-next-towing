import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import LocationForm from "@/components/admin/LocationForm";
import { saveUploadedImage } from "@/lib/save-uploaded-image";

export const runtime = "nodejs";

const slugify = (value) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

async function createLocation(formData) {
  "use server";
  const name = String(formData.get("name") || "").trim();
  const type = String(formData.get("type") || "CITY");
  const customSlug = String(formData.get("slug") || "").trim();
  const slug = slugify(customSlug || name);
  const excerpt = String(formData.get("excerpt") || "").trim();
  const description = String(formData.get("description") || "");
  const metaTitle = String(formData.get("metaTitle") || "").trim();
  const metaDescription = String(formData.get("metaDescription") || "").trim();
  const existingImage = String(formData.get("existingImage") || "").trim();
  const featuredImageFile = formData.get("featuredImage");

  if (!name || !slug) return;

  let featuredImage = existingImage;
  if (featuredImageFile instanceof File && featuredImageFile.size > 0) {
    const savedPath = await saveUploadedImage(featuredImageFile, slug, "locations");
    if (savedPath && !savedPath.startsWith("http")) {
      featuredImage = savedPath;
    }
  }

  if (featuredImage.startsWith("http://") || featuredImage.startsWith("https://")) {
    featuredImage = "";
  }

  try {
    await prisma.location.create({
      data: {
        name,
        slug,
        type,
        excerpt,
        description,
        metaTitle,
        metaDescription,
        featuredImage,
      },
    });
  } catch (error) {
    console.error("Failed to create location", error);
    return;
  }

  revalidatePath("/dashboard/locations");
  redirect("/dashboard/locations");
}

export default function NewLocation() {
  return (
    <section className="container-1300 section-space">
      <LocationForm
        action={createLocation}
        submitLabel="Create location"
        headline="Create Location"
        subheading="Add a new area or motorway we cover so it can power landing pages."
        backHref="/dashboard/locations"
      />
    </section>
  );
}
