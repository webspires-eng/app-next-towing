import { PrismaClient } from "@prisma/client";

const hasDatabase = Boolean(process.env.DATABASE_URL);

const globalForPrisma = globalThis;

const fallbackPrisma = createFallbackPrisma();

export const prisma = hasDatabase
  ? globalForPrisma.prisma || new PrismaClient()
  : fallbackPrisma;

if (hasDatabase && process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

function createFallbackPrisma() {
  const services = [
    {
      id: "svc_car",
      slug: "car-recovery",
      name: "Car Recovery",
      createdAt: new Date("2024-01-01T00:00:00Z"),
      updatedAt: new Date("2024-01-01T00:00:00Z"),
    },
    {
      id: "svc_towing",
      slug: "towing",
      name: "24/7 Vehicle Towing",
      createdAt: new Date("2024-01-02T00:00:00Z"),
      updatedAt: new Date("2024-01-02T00:00:00Z"),
    },
    {
      id: "svc_ev",
      slug: "ev-recovery",
      name: "EV Recovery",
      createdAt: new Date("2024-01-03T00:00:00Z"),
      updatedAt: new Date("2024-01-03T00:00:00Z"),
    },
  ];

  const locations = [
    {
      id: "loc_manchester",
      slug: "manchester",
      name: "Manchester",
      type: "city",
      createdAt: new Date("2024-01-01T00:00:00Z"),
      updatedAt: new Date("2024-01-01T00:00:00Z"),
    },
    {
      id: "loc_bolton",
      slug: "bolton",
      name: "Bolton",
      type: "city",
      createdAt: new Date("2024-01-01T00:00:00Z"),
      updatedAt: new Date("2024-01-01T00:00:00Z"),
    },
    {
      id: "loc_m60",
      slug: "m60",
      name: "M60 Motorway",
      type: "motorway",
      createdAt: new Date("2024-01-01T00:00:00Z"),
      updatedAt: new Date("2024-01-01T00:00:00Z"),
    },
  ];

  const pages = [];

  services.forEach((service, svcIndex) => {
    locations.forEach((location, locIndex) => {
      pages.push({
        id: `page_${svcIndex}_${locIndex}`,
        serviceId: service.id,
        locationId: location.id,
        title: `${service.name} in ${location.name}`,
        content: "",
        slug: `${service.slug}-${location.slug}`,
        published: true,
        createdAt: new Date("2024-01-05T00:00:00Z"),
        updatedAt: new Date("2024-01-05T00:00:00Z"),
      });
    });
  });

  const posts = [
    {
      id: "post_1",
      title: "Keeping Greater Manchester moving",
      slug: "keeping-greater-manchester-moving",
      content:
        "See how our round-the-clock dispatchers keep drivers moving across the region with rapid roadside response.",
      status: "published",
      createdAt: new Date("2024-01-10T00:00:00Z"),
      updatedAt: new Date("2024-01-10T00:00:00Z"),
    },
  ];

  const users = [
    {
      id: "user_1",
      email: "dispatcher@nexttowing.co.uk",
      name: "Lead Dispatcher",
      role: "admin",
      createdAt: new Date("2024-01-01T00:00:00Z"),
      updatedAt: new Date("2024-01-01T00:00:00Z"),
    },
  ];

  const makeCopy = (item) => ({ ...item });

  const pick = (item, select) => {
    if (!select) return makeCopy(item);
    const result = {};
    for (const [key, value] of Object.entries(select)) {
      if (value && key in item) {
        result[key] = item[key];
      }
    }
    return result;
  };

  const findServiceById = (id) => services.find((service) => service.id === id);
  const findServiceBySlug = (slug) => services.find((service) => service.slug === slug);
  const findLocationById = (id) => locations.find((location) => location.id === id);
  const findLocationBySlug = (slug) => locations.find((location) => location.slug === slug);

  const withIncludes = (record, include) => {
    if (!include) return record;

    const result = { ...record };

    if (include.service) {
      const service = findServiceById(record.serviceId);
      result.service = include.service.select
        ? pick(service, include.service.select)
        : makeCopy(service);
    }

    if (include.location) {
      const location = findLocationById(record.locationId);
      result.location = include.location.select
        ? pick(location, include.location.select)
        : makeCopy(location);
    }

    return result;
  };

  const applyPageWhere = (records, where = {}) => {
    let filtered = [...records];

    if ("published" in where) {
      filtered = filtered.filter((page) => page.published === where.published);
    }

    if (where.serviceId) {
      filtered = filtered.filter((page) => page.serviceId === where.serviceId);
    }

    if (where.locationId) {
      filtered = filtered.filter((page) => page.locationId === where.locationId);
    }

    if (where.service?.slug) {
      filtered = filtered.filter((page) => {
        const service = findServiceById(page.serviceId);
        return service?.slug === where.service.slug;
      });
    }

    if (where.location?.slug) {
      filtered = filtered.filter((page) => {
        const location = findLocationById(page.locationId);
        return location?.slug === where.location.slug;
      });
    }

    return filtered;
  };

  const applyOrderBy = (records, orderBy) => {
    if (!orderBy) return records;

    const cloned = [...records];

    if (orderBy.name === "asc") {
      cloned.sort((a, b) => a.name.localeCompare(b.name));
    } else if (orderBy.updatedAt === "desc") {
      cloned.sort(
        (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
      );
    } else if (orderBy.service?.name === "asc") {
      cloned.sort((a, b) => {
        const serviceA = findServiceById(a.serviceId);
        const serviceB = findServiceById(b.serviceId);
        return (serviceA?.name || "").localeCompare(serviceB?.name || "");
      });
    } else if (orderBy.location?.name === "asc") {
      cloned.sort((a, b) => {
        const locationA = findLocationById(a.locationId);
        const locationB = findLocationById(b.locationId);
        return (locationA?.name || "").localeCompare(locationB?.name || "");
      });
    }

    return cloned;
  };

  const api = {
    async $disconnect() {},
    service: {
      findMany: async (args = {}) => {
        let records = [...services];
        if (args.orderBy) {
          records = applyOrderBy(records, args.orderBy);
        }
        return args.select
          ? records.map((service) => pick(service, args.select))
          : records.map(makeCopy);
      },
      findUnique: async ({ where, select } = {}) => {
        if (!where) return null;
        const service = where.slug
          ? findServiceBySlug(where.slug)
          : where.id
            ? findServiceById(where.id)
            : null;
        if (!service) return null;
        return select ? pick(service, select) : makeCopy(service);
      },
      create: async ({ data }) => {
        const now = new Date();
        const id = `svc_${services.length + 1}`;
        const entry = {
          id,
          name: data.name || `Service ${services.length + 1}`,
          slug:
            data.slug ||
            (data.name
              ? data.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
              : `service-${services.length + 1}`),
          createdAt: now,
          updatedAt: now,
        };
        services.push(entry);
        return makeCopy(entry);
      },
      count: async () => services.length,
    },
    location: {
      findMany: async (args = {}) => {
        let records = [...locations];
        if (args.orderBy) {
          records = applyOrderBy(records, args.orderBy);
        }
        if (args.select) {
          return records.map((location) => pick(location, args.select));
        }
        return records.map(makeCopy);
      },
      findUnique: async ({ where, select } = {}) => {
        if (!where) return null;
        const location = where.slug
          ? findLocationBySlug(where.slug)
          : where.id
            ? findLocationById(where.id)
            : null;
        if (!location) return null;
        return select ? pick(location, select) : makeCopy(location);
      },
      create: async ({ data }) => {
        const now = new Date();
        const id = `loc_${locations.length + 1}`;
        const entry = {
          id,
          name: data.name || `Location ${locations.length + 1}`,
          slug:
            data.slug ||
            (data.name
              ? data.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
              : `location-${locations.length + 1}`),
          type: data.type || "city",
          createdAt: now,
          updatedAt: now,
        };
        locations.push(entry);
        return makeCopy(entry);
      },
      delete: async ({ where }) => {
        if (!where?.id) return;
        const index = locations.findIndex((location) => location.id === where.id);
        if (index !== -1) {
          locations.splice(index, 1);
        }
      },
      count: async () => locations.length,
    },
    page: {
      findMany: async (args = {}) => {
        let records = [...pages];
        if (args.where) {
          records = applyPageWhere(records, args.where);
        }
        if (args.orderBy) {
          records = applyOrderBy(records, args.orderBy);
        }
        return records.map((record) => {
          const withInclude = withIncludes(record, args.include);
          return args.select ? pick(withInclude, args.select) : makeCopy(withInclude);
        });
      },
      findFirst: async (args = {}) => {
        const results = await api.page.findMany({ ...args });
        return results[0] || null;
      },
      findUnique: async (args = {}) => {
        if (!args.where?.id) return null;
        const record = pages.find((page) => page.id === args.where.id);
        if (!record) return null;
        const withInclude = withIncludes(record, args.include);
        return args.select ? pick(withInclude, args.select) : makeCopy(withInclude);
      },
      count: async () => pages.length,
    },
    post: {
      findMany: async (args = {}) => {
        let records = [...posts];
        if (args.orderBy) {
          records = applyOrderBy(records, args.orderBy);
        }
        return records.map((post) => (args.select ? pick(post, args.select) : makeCopy(post)));
      },
      create: async ({ data }) => {
        const now = new Date();
        const entry = {
          id: `post_${posts.length + 1}`,
          title: data.title || `Post ${posts.length + 1}`,
          slug:
            data.slug ||
            (data.title
              ? data.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
              : `post-${posts.length + 1}`),
          content: data.content || "",
          status: data.status || "draft",
          createdAt: now,
          updatedAt: now,
        };
        posts.push(entry);
        return makeCopy(entry);
      },
      delete: async ({ where }) => {
        if (!where?.id) return;
        const index = posts.findIndex((post) => post.id === where.id);
        if (index !== -1) {
          posts.splice(index, 1);
        }
      },
      count: async () => posts.length,
    },
    user: {
      findMany: async (args = {}) => {
        let records = [...users];
        if (args.orderBy?.createdAt === "desc") {
          records.sort(
            (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
          );
        }
        return records.map((user) => (args.select ? pick(user, args.select) : makeCopy(user)));
      },
      count: async () => users.length,
    },
  };

  return api;
}
