import { PrismaClient } from "@prisma/client";
import {
  FALLBACK_LOCATIONS,
  FALLBACK_PAGES,
  FALLBACK_POSTS,
  FALLBACK_SERVICES,
  FALLBACK_USERS,
} from "@/lib/fallback-data";

const hasDatabaseUrl = Boolean(process.env.DATABASE_URL);

function buildFallbackPrisma() {
  const services = [...FALLBACK_SERVICES];
  const locations = [...FALLBACK_LOCATIONS];
  const pagesData = [...FALLBACK_PAGES];
  const posts = [...FALLBACK_POSTS];
  const users = [...FALLBACK_USERS];

  const randomId = (prefix) => `${prefix}-${Math.random().toString(36).slice(2, 10)}`;

  function applySelect(record, select) {
    if (!select) return { ...record };
    const picked = {};
    for (const [key, value] of Object.entries(select)) {
      if (value && key in record) {
        picked[key] = record[key];
      }
    }
    return picked;
  }

  function formatRelation(record, config) {
    if (!record) return null;
    if (!config || config === true) return { ...record };
    if (config.select) {
      return applySelect(record, config.select);
    }
    return { ...record };
  }

  function matchPage(page, where = {}) {
    if (!where) return true;
    if (where.published !== undefined && page.published !== where.published) {
      return false;
    }
    if (where.serviceId && page.serviceId !== where.serviceId) {
      return false;
    }
    if (where.locationId && page.locationId !== where.locationId) {
      return false;
    }
    if (where.service?.slug) {
      const service = services.find((item) => item.id === page.serviceId);
      if (!service || service.slug !== where.service.slug) {
        return false;
      }
    }
    if (where.location?.slug) {
      const location = locations.find((item) => item.id === page.locationId);
      if (!location || location.slug !== where.location.slug) {
        return false;
      }
    }
    return true;
  }

  function sortSimple(records, orderBy) {
    if (!orderBy) return [...records];
    const [[key, direction]] = Object.entries(orderBy);
    const dir = direction === "desc" ? -1 : 1;
    return [...records].sort((a, b) => {
      const aVal = a[key];
      const bVal = b[key];
      if (typeof aVal === "string" && typeof bVal === "string") {
        return aVal.localeCompare(bVal) * dir;
      }
      return (aVal > bVal ? 1 : aVal < bVal ? -1 : 0) * dir;
    });
  }

  function relationValue(page, relationKey, field) {
    if (relationKey === "service") {
      const service = services.find((item) => item.id === page.serviceId);
      return service?.[field] ?? "";
    }
    if (relationKey === "location") {
      const location = locations.find((item) => item.id === page.locationId);
      return location?.[field] ?? "";
    }
    return "";
  }

  function sortPages(pages, orderBy) {
    if (!orderBy) return [...pages];
    const [[key, value]] = Object.entries(orderBy);
    if (value && typeof value === "object" && !Array.isArray(value)) {
      const nestedKey = Object.keys(value)[0];
      const dir = value[nestedKey] === "desc" ? -1 : 1;
      return [...pages].sort((a, b) => {
        const aVal = relationValue(a, key, nestedKey);
        const bVal = relationValue(b, key, nestedKey);
        return aVal.localeCompare(bVal) * dir;
      });
    }
    const dir = value === "desc" ? -1 : 1;
    return [...pages].sort((a, b) => {
      const aVal = a[key];
      const bVal = b[key];
      if (typeof aVal === "string" && typeof bVal === "string") {
        return aVal.localeCompare(bVal) * dir;
      }
      return (aVal > bVal ? 1 : aVal < bVal ? -1 : 0) * dir;
    });
  }

  function formatPage(page, args = {}) {
    const { include, select } = args;
    const base = select ? applySelect(page, select) : { ...page };
    if (include?.service) {
      const service = services.find((item) => item.id === page.serviceId);
      base.service = formatRelation(service, include.service);
    }
    if (include?.location) {
      const location = locations.find((item) => item.id === page.locationId);
      base.location = formatRelation(location, include.location);
    }
    return base;
  }

  const serviceApi = {
    async findMany(args = {}) {
      const { orderBy, select } = args;
      const records = sortSimple(services, orderBy);
      return records.map((record) => (select ? applySelect(record, select) : { ...record }));
    },
    async findUnique({ where }) {
      if (where?.slug) {
        const match = services.find((service) => service.slug === where.slug);
        return match ? { ...match } : null;
      }
      if (where?.id) {
        const match = services.find((service) => service.id === where.id);
        return match ? { ...match } : null;
      }
      return null;
    },
    async create({ data }) {
      const now = new Date();
      const record = {
        id: data.id ?? randomId("svc"),
        slug: data.slug ?? randomId("svc"),
        name: data.name ?? "Untitled Service",
        createdAt: now,
        updatedAt: now,
      };
      services.push(record);
      return { ...record };
    },
    async count() {
      return services.length;
    },
  };

  const locationApi = {
    async findMany(args = {}) {
      const { orderBy, select } = args;
      const records = sortSimple(locations, orderBy);
      return records.map((record) => (select ? applySelect(record, select) : { ...record }));
    },
    async findUnique({ where }) {
      if (where?.slug) {
        const match = locations.find((location) => location.slug === where.slug);
        return match ? { ...match } : null;
      }
      if (where?.id) {
        const match = locations.find((location) => location.id === where.id);
        return match ? { ...match } : null;
      }
      return null;
    },
    async create({ data }) {
      const now = new Date();
      const record = {
        id: data.id ?? randomId("loc"),
        slug: data.slug ?? randomId("loc"),
        name: data.name ?? "Untitled Location",
        type: data.type ?? "CITY",
        createdAt: now,
        updatedAt: now,
      };
      locations.push(record);
      return { ...record };
    },
    async delete({ where }) {
      const index = locations.findIndex((location) => location.id === where?.id);
      if (index === -1) return null;
      const [removed] = locations.splice(index, 1);
      for (let i = pagesData.length - 1; i >= 0; i -= 1) {
        if (pagesData[i].locationId === removed.id) {
          pagesData.splice(i, 1);
        }
      }
      return { ...removed };
    },
    async count() {
      return locations.length;
    },
  };

  const pageApi = {
    async findMany(args = {}) {
      const { where, orderBy, include, select } = args;
      const filtered = pagesData.filter((page) => matchPage(page, where));
      const sorted = sortPages(filtered, orderBy);
      return sorted.map((page) => formatPage(page, { include, select }));
    },
    async findFirst(args = {}) {
      const results = await pageApi.findMany(args);
      return results[0] ?? null;
    },
    async count() {
      return pagesData.length;
    },
  };

  const postApi = {
    async findMany(args = {}) {
      const { orderBy } = args;
      const records = sortSimple(posts, orderBy);
      return records.map((record) => ({ ...record }));
    },
    async create({ data }) {
      const now = new Date();
      const record = {
        id: data.id ?? randomId("post"),
        title: data.title ?? "Untitled",
        slug: data.slug ?? randomId("post"),
        content: data.content ?? "",
        status: data.status ?? "draft",
        createdAt: now,
        updatedAt: now,
      };
      posts.push(record);
      return { ...record };
    },
    async delete({ where }) {
      const index = posts.findIndex((post) => post.id === where?.id);
      if (index === -1) return null;
      const [removed] = posts.splice(index, 1);
      return { ...removed };
    },
    async count() {
      return posts.length;
    },
  };

  const userApi = {
    async findMany(args = {}) {
      const { orderBy } = args;
      const records = sortSimple(users, orderBy);
      return records.map((record) => ({ ...record }));
    },
    async count() {
      return users.length;
    },
  };

  return {
    service: serviceApi,
    location: locationApi,
    page: pageApi,
    post: postApi,
    user: userApi,
  };
}

let prismaClient;

if (hasDatabaseUrl) {
  const globalForPrisma = globalThis;
  prismaClient = globalForPrisma.prisma || new PrismaClient();
  if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prismaClient;
  }
} else {
  const globalForWarn = globalThis;
  if (!globalForWarn.__PRISMA_FALLBACK_WARNED) {
    console.warn(
      "DATABASE_URL is not set. Falling back to mock Prisma client with static seed data."
    );
    globalForWarn.__PRISMA_FALLBACK_WARNED = true;
  }
  prismaClient = buildFallbackPrisma();
}

export const prisma = prismaClient;
