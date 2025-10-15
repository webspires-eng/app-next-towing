import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export const runtime = "nodejs";
const slugify = s => s.toLowerCase().trim().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,"");

async function createPost(formData) {
  "use server";
  const title   = String(formData.get("title") || "").trim();
  const slug    = slugify(title || String(formData.get("slug") || ""));
  const content = String(formData.get("content") || "");
  const status  = String(formData.get("status") || "draft");
  if (!title || !slug) return;
  try { await prisma.post.create({ data: { title, slug, content, status } }); } catch {}
  redirect("/dashboard/posts");
}

export default function NewPost() {
  return (
    <section className="container-1300 section-space">
      <h1>Create Post</h1>
      <form action={createPost} style={{display:"grid",gap:12,maxWidth:760}}>
        <label>
          <div>Title</div>
          <input name="title" className="input" required placeholder="5 tips for motorway breakdowns" />
        </label>
        <label>
          <div>Status</div>
          <select name="status" className="input" defaultValue="draft">
            <option value="draft">draft</option>
            <option value="published">published</option>
          </select>
        </label>
        <label>
          <div>Content</div>
          <textarea name="content" className="input" rows={8} placeholder="Write your post…" />
        </label>
        <button className="btn" type="submit">Save</button>
      </form>
    </section>
  );
}
