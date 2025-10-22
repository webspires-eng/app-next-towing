import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import LocationForm from "@/components/admin/LocationForm";

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

  if (!name || !slug) return;

  try {
    await prisma.location.create({
      data: {
        name,
        slug,
        type,
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
