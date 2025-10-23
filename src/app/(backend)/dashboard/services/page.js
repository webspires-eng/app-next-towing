import Link from "next/link";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

async function deleteService(formData) {
  "use server";
  const id = String(formData.get("serviceId") || "");
  if (!id) return;
  try {
    await prisma.$transaction([
      prisma.page.deleteMany({ where: { serviceId: id } }),
      prisma.service.delete({ where: { id } }),
    ]);
  } catch (error) {
    console.error("Failed to delete service", error);
  }
  revalidatePath("/dashboard/services");
}

export default async function ServicesList() {
  const services = await prisma.service.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      slug: true,
      excerpt: true,
      metaTitle: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return (
    <section className="container-1300 section-space">
      <div className="flex flex-col gap-6">
        <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-[#0E172B]">Services</h1>
            <p className="text-sm text-[#0E172B]/70">Manage the services shown across the public site.</p>
          </div>
          <Link href="/dashboard/services/new" className="btn">
            Add service
          </Link>
        </header>

        <div className="overflow-hidden rounded-2xl border border-[#0E172B]/10 bg-white shadow-lg">
          <table className="min-w-full divide-y divide-[#0E172B]/10 text-left text-sm text-[#0E172B]">
            <thead className="bg-[#FACC14]/10 text-xs font-semibold uppercase tracking-[0.2em] text-[#0E172B]">
              <tr>
                <th className="px-5 py-3">Title</th>
                <th className="px-5 py-3">Slug</th>
                <th className="px-5 py-3">Excerpt</th>
                <th className="px-5 py-3">Updated</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#0E172B]/10">
              {services.length === 0 && (
                <tr>
                  <td className="px-5 py-8 text-center text-[#0E172B]/60" colSpan={5}>
                    No services yet. Create your first one.
                  </td>
                </tr>
              )}
              {services.map((service) => (
                <tr key={service.id} className="hover:bg-[#0E172B]/3">
                  <td className="px-5 py-4 font-semibold">{service.name}</td>
                  <td className="px-5 py-4 font-mono text-xs uppercase text-[#0E172B]/70">{service.slug}</td>
                  <td className="px-5 py-4 text-[#0E172B]/70">{service.excerpt || "—"}</td>
                  <td className="px-5 py-4 text-[#0E172B]/60">
                    {new Date(service.updatedAt).toLocaleDateString()}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-3">
                      <Link
                        href={`/dashboard/services/${service.id}/edit`}
                        className="text-sm font-semibold text-[#0E172B] hover:text-[#FACC14]"
                      >
                        Edit
                      </Link>
                      <form action={deleteService} className="inline-flex">
                        <input type="hidden" name="serviceId" value={service.id} />
                        <button
                          type="submit"
                          className="text-sm font-semibold text-red-500 hover:text-red-600"
                          aria-label={`Delete ${service.name}`}
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
