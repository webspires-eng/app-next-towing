import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { revalidatePath } from "next/cache";

const hasDatabase = Boolean(process.env.DATABASE_URL);

export const runtime = "nodejs";

async function removePost(formData) {
  "use server";
  const id = String(formData.get("id") || "");
  if (!id) return;
  if (!hasDatabase) return;
  try { await prisma.post.delete({ where: { id } }); } catch {}
  revalidatePath("/dashboard/posts");
}

export default async function PostsList() {
  if (!hasDatabase) {
    return (
      <section className="container-1300 section-space">
        <header className="section-head">
          <h1 style={{ margin: 0 }}>Posts</h1>
          <Link href="/dashboard/posts/new" className="btn" aria-disabled>
            New
          </Link>
        </header>
        <p className="muted">Configure DATABASE_URL to manage blog posts.</p>
      </section>
    );
  }

  const rows = await prisma.post.findMany({ orderBy: { updatedAt: "desc" } });
  return (
    <section>
      <header className="section-head">
        <h1 style={{margin:0}}>Posts</h1>
        <Link href="/dashboard/posts/new" className="btn">New</Link>
      </header>

      <div style={{display:"grid",gap:12}}>
        {rows.map(r => (
          <article key={r.id} className="card" style={{display:"grid",gridTemplateColumns:"1fr auto",alignItems:"center",gap:12}}>
            <div>
              <div style={{fontWeight:700}}>{r.title}</div>
              <div className="muted" style={{fontSize:14}}>/blog/{r.slug} • {r.status}</div>
            </div>
            <form action={removePost}>
              <input type="hidden" name="id" value={r.id} />
              <button className="btn btn-outline" type="submit">Delete</button>
            </form>
          </article>
        ))}
        {rows.length === 0 && <p className="muted">No posts yet.</p>}
      </div>
    </section>
  );
}
