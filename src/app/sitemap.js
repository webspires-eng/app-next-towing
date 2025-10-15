import { SERVICES, LOCATIONS } from "@/data/locations";

export default async function sitemap() {
  const base = "https://your-domain.com";
  const pages = [];

  for (const s of SERVICES) {
    for (const l of LOCATIONS) {
      pages.push({
        url: `${base}/${s.slug}/${l.slug}`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 0.8,
      });
    }
  }

  // add homepage etc.
  pages.push({ url: `${base}/`, lastModified: new Date(), priority: 1.0 });

  return pages;
}
