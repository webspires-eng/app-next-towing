import { prisma } from "@/lib/prisma";
import Link from "next/link";

const hasDatabase = Boolean(process.env.DATABASE_URL);

export const runtime = "nodejs";

export default async function AdminHome() {
  if (!hasDatabase) {
    return (
      <section className="container-1300 section-space">
        <h1>Dashboard</h1>
        <p className="muted" style={{ marginTop: 16 }}>
          Connect the Prisma database (DATABASE_URL) to unlock admin analytics and content management.
        </p>
      </section>
    );
  }

  const [services, locations, pages, posts, users] = await Promise.all([
    prisma.service.count(),
    prisma.location.count(),
    prisma.page.count(),
    prisma.post.count(),
    prisma.user.count(),
  ]);

  const CARDS = [
    { label: "Services",  value: services,  href: "/dashboard/services",  tone: "red",    icon: "🧰" },
    { label: "Locations", value: locations, href: "/dashboard/locations", tone: "green",  icon: "📍" },
    { label: "Pages",     value: pages,     href: "/dashboard/pages",     tone: "blue",   icon: "🧾" },
    { label: "Posts",     value: posts,     href: "/dashboard/posts",     tone: "purple", icon: "✍️" },
    { label: "Users",     value: users,     href: "/dashboard/users",     tone: "orange", icon: "👤" },
  ];

  return (
    <section>
      <h1 style={{margin:0, marginBottom:16}}>Dashboard</h1>
      <div className="cards-4up">
        {CARDS.map(c => (
          <Link key={c.label} href={c.href} className={`dash-card tone-${c.tone}`}>
            <div className="dash-card-top">
              <span className="dash-icon" aria-hidden>{c.icon}</span>
              <span className="dash-pill">View</span>
            </div>
            <div className="dash-metric">{c.value}</div>
            <div className="dash-label">{c.label}</div>
          </Link>
        ))}
      </div>

      <div className="dash-actions">
        <Link className="btn" href="/dashboard/services/new">New Service</Link>
        <Link className="btn" href="/dashboard/locations/new">New Location</Link>
        <Link className="btn" href="/dashboard/pages/new">New Page</Link>
      </div>
    </section>
  );
}
