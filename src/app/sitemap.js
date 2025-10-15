import { prisma } from "@/lib/prisma";

export default async function sitemap() {
  const base = "https://your-domain.com";
  const pages = await prisma.page.findMany({
    include: { service: { select: { slug: true }}, location: { select: { slug: true }}}
  });

  return [
    { url: `${base}/`, lastModified: new Date(), priority: 1 },
    ...pages.map(p => ({
      url: `${base}/${p.service.slug}/${p.location.slug}`,
      lastModified: p.updatedAt,
      changeFrequency: "daily",
      priority: 0.8
    }))
  ];
}
