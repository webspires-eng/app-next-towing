const FALLBACK_LOCATIONS = [
  { id: "loc-manchester", slug: "manchester", name: "Manchester" },
  { id: "loc-salford", slug: "salford", name: "Salford" },
  { id: "loc-stockport", slug: "stockport", name: "Stockport" },
  { id: "loc-bolton", slug: "bolton", name: "Bolton" },
];

const FALLBACK_SERVICES = [
  { id: "svc-breakdown", slug: "breakdown-recovery", name: "Breakdown Recovery" },
  { id: "svc-flatbed", slug: "flatbed-transport", name: "Flatbed Transport" },
  { id: "svc-motorway", slug: "motorway-rescue", name: "Motorway Rescue" },
  { id: "svc-ev", slug: "ev-specialist-recovery", name: "EV Specialist Recovery" },
];

const fallbackUpdatedAt = new Date("2024-01-01T00:00:00Z");

const FALLBACK_PAGES = FALLBACK_SERVICES.flatMap((service) =>
  FALLBACK_LOCATIONS.map((location, index) => ({
    id: `page-${service.slug}-${location.slug}`,
    serviceId: service.id,
    locationId: location.id,
    title: `${service.name} in ${location.name}`,
    content: "",
    published: true,
    updatedAt: new Date(fallbackUpdatedAt.getTime() + index * 86400000),
  }))
);

const FALLBACK_USERS = [
  {
    id: "user-demo-admin",
    name: "Demo Admin",
    email: "admin@example.com",
    role: "ADMIN",
    createdAt: fallbackUpdatedAt,
    updatedAt: fallbackUpdatedAt,
  },
];

const FALLBACK_POSTS = [
  {
    id: "post-roadside-tips",
    title: "5 essential roadside safety tips",
    slug: "roadside-safety-tips",
    content:
      "Keep a high-visibility jacket, warning triangle, and emergency numbers saved before you set off. Stay behind the barrier on motorways and call for specialist recovery for complex situations.",
    status: "published",
    createdAt: fallbackUpdatedAt,
    updatedAt: fallbackUpdatedAt,
  },
];

export {
  FALLBACK_LOCATIONS,
  FALLBACK_PAGES,
  FALLBACK_POSTS,
  FALLBACK_SERVICES,
  FALLBACK_USERS,
};
