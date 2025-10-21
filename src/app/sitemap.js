import { prisma } from "@/lib/prisma";

const hasDatabase = Boolean(process.env.DATABASE_URL);

export default async function sitemap() {
  const base = "https://your-domain.com";

  if (!hasDatabase) {
    return [
      { url: `${base}/`, lastModified: new Date(), priority: 1 },
      { url: `${base}/services`, lastModified: new Date(), priority: 0.6 },
      { url: `${base}/areas`, lastModified: new Date(), priority: 0.6 },
    ];
  }

  const pages = await prisma.page.findMany({
    include: { service: { select: { slug: true } }, location: { select: { slug: true } } },
  });

  return [
    { url: `${base}/`, lastModified: new Date(), priority: 1 },
    ...pages.map((p) => ({
      url: `${base}/${p.service.slug}/${p.location.slug}`,
      lastModified: p.updatedAt,
      changeFrequency: "daily",
      priority: 0.8,
    })),
  ];
}
