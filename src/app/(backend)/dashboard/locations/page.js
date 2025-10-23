import Link from "next/link";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

async function removeLocation(formData) {
  "use server";
  const id = String(formData.get("id") || "");
  if (!id) return;
  try {
    await prisma.$transaction([
      prisma.page.deleteMany({ where: { locationId: id } }),
      prisma.location.delete({ where: { id } }),
    ]);
  } catch (error) {
    console.error("Failed to delete location", error);
  }
  revalidatePath("/dashboard/locations");
}

export default async function LocationsList() {
  const locations = await prisma.location.findMany({ orderBy: { name: "asc" } });

  return (
    <section className="container-1300 section-space">
      <div className="flex flex-col gap-6">
        <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-[#0E172B]">Locations</h1>
            <p className="text-sm text-[#0E172B]/70">Manage every area and motorway you cover to power landing pages.</p>
          </div>
          <Link href="/dashboard/locations/new" className="btn">
            Add location
          </Link>
        </header>

        <div className="overflow-hidden rounded-2xl border border-[#0E172B]/10 bg-white shadow-lg">
          <table className="min-w-full divide-y divide-[#0E172B]/10 text-left text-sm text-[#0E172B]">
            <thead className="bg-[#FACC14]/10 text-xs font-semibold uppercase tracking-[0.2em] text-[#0E172B]">
              <tr>
                <th className="px-5 py-3">Name</th>
                <th className="px-5 py-3">Slug</th>
                <th className="px-5 py-3">Type</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#0E172B]/10">
              {locations.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-5 py-8 text-center text-[#0E172B]/60">
                    No locations yet. Create your first one.
                  </td>
                </tr>
              )}
              {locations.map((location) => (
                <tr key={location.id} className="hover:bg-[#0E172B]/3">
                  <td className="px-5 py-4 font-semibold">{location.name}</td>
                  <td className="px-5 py-4 font-mono text-xs uppercase text-[#0E172B]/70">{location.slug}</td>
                  <td className="px-5 py-4 text-[#0E172B]/70">{location.type}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-3">
                      <Link
                        href={`/dashboard/locations/${location.id}/edit`}
                        className="text-sm font-semibold text-[#0E172B] hover:text-[#FACC14]"
                      >
                        Edit
                      </Link>
                      <form action={removeLocation} className="inline-flex">
                        <input type="hidden" name="id" value={location.id} />
                        <button
                          type="submit"
                          className="text-sm font-semibold text-red-500 hover:text-red-600"
                          aria-label={`Delete ${location.name}`}
                        >
                          Delete
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
