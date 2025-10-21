import { prisma } from "@/lib/prisma";

const hasDatabase = Boolean(process.env.DATABASE_URL);

export const runtime = "nodejs";

export default async function UsersList() {
  if (!hasDatabase) {
    return (
      <section className="container-1300 section-space">
        <h1>Users</h1>
        <p className="muted">Database connection required to list internal users.</p>
      </section>
    );
  }

  const rows = await prisma.user.findMany({ orderBy: { createdAt: "desc" } });
  return (
    <section>
      <h1>Users</h1>
      <div style={{display:"grid",gap:12}}>
        {rows.map(u => (
          <article key={u.id} className="card" style={{display:"flex",justifyContent:"space-between"}}>
            <div>
              <div style={{fontWeight:600}}>{u.name || "—"}</div>
              <div className="muted" style={{fontSize:14}}>{u.email}</div>
            </div>
            <div className="muted" style={{fontSize:12}}>role: {u.role}</div>
          </article>
        ))}
        {rows.length === 0 && <p className="muted">No users yet.</p>}
      </div>
    </section>
  );
}
