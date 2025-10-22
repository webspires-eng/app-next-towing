import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import LocationForm from "@/components/admin/LocationForm";

export const runtime = "nodejs";

const slugify = (value) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

async function updateLocation(formData) {
  "use server";
  const id = String(formData.get("id") || "");
  if (!id) return;

  const name = String(formData.get("name") || "").trim();
  const customSlug = String(formData.get("slug") || "").trim();
  const slug = slugify(customSlug || name);
  const type = String(formData.get("type") || "CITY");

  if (!name || !slug) return;

  try {
    await prisma.location.update({
      where: { id },
      data: { name, slug, type },
    });
  } catch (error) {
    console.error("Failed to update location", error);
    return;
  }

  revalidatePath("/dashboard/locations");
  redirect("/dashboard/locations");
}

export default async function EditLocation({ params }) {
  const location = await prisma.location.findUnique({
    where: { id: params.id },
  });

  if (!location) {
    notFound();
  }

  return (
    <section className="container-1300 section-space">
      <LocationForm
        action={updateLocation}
        submitLabel="Save changes"
        locationId={location.id}
        initialData={{
          name: location.name,
          slug: location.slug,
          type: location.type,
        }}
        headline="Edit Location"
        subheading="Update the name, slug, or type for this service area."
        backHref="/dashboard/locations"
      />
    </section>
  );
}
