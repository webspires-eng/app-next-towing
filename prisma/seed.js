// prisma/seed.js (CommonJS)
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // Services
  await prisma.service.upsert({
    where: { slug: "car-recovery" },
    update: {},
    create: { slug: "car-recovery", name: "Car Recovery" },
  });
  await prisma.service.upsert({
    where: { slug: "towing" },
    update: {},
    create: { slug: "towing", name: "Towing" },
  });

  // Locations
  await prisma.location.upsert({
    where: { slug: "manchester" },
    update: {},
    create: { slug: "manchester", name: "Manchester", type: "CITY" },
  });
  await prisma.location.upsert({
    where: { slug: "bolton" },
    update: {},
    create: { slug: "bolton", name: "Bolton", type: "CITY" },
  });
  await prisma.location.upsert({
    where: { slug: "m60" },
    update: {},
    create: { slug: "m60", name: "M60 Motorway", type: "MOTORWAY" },
  });

  // Example pages
  const towing = await prisma.service.findUnique({ where: { slug: "towing" } });
  const recovery = await prisma.service.findUnique({ where: { slug: "car-recovery" } });
  const man = await prisma.location.findUnique({ where: { slug: "manchester" } });
  const bol = await prisma.location.findUnique({ where: { slug: "bolton" } });

  const pages = [
    { serviceId: towing.id, locationId: man.id, title: "Towing in Manchester" },
    { serviceId: recovery.id, locationId: bol.id, title: "Car Recovery in Bolton" },
  ];

  for (const p of pages) {
    await prisma.page.upsert({
      where: { serviceId_locationId: { serviceId: p.serviceId, locationId: p.locationId } },
      update: { title: p.title },
      create: { ...p, content: "" },
    });
  }
}

main()
  .then(async () => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
