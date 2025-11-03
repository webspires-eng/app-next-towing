import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export const runtime = "nodejs";
const slugify = s => s.toLowerCase().trim().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,"");

async function updatePost(formData) {
  "use server";
  const id      = String(formData.get("id") || "");
  const title   = String(formData.get("title") || "").trim();
  const slug    = slugify(formData.get("slug") || title);
  const content = String(formData.get("content") || "");
  const status  = String(formData.get("status") || "draft");
  
  if (!id || !title || !slug) {
    throw new Error("ID, title and slug are required");
  }
  
  try { 
    await prisma.post.update({ 
      where: { id },
      data: { title, slug, content, status } 
    }); 
  } catch (error) {
    console.error("Failed to update post", error);
    throw error;
  }
  
  revalidatePath("/dashboard/posts");
  redirect("/dashboard/posts");
}

export default async function EditPost({ params }) {
  const post = await prisma.post.findUnique({
    where: { id: params.id },
  });

  if (!post) {
    notFound();
  }

  return (
    <section className="container-1300 section-space">
      <div className="flex flex-col gap-6">
        <header className="flex flex-col gap-3 rounded-2xl border border-[#0E172B]/10 bg-white p-6 shadow-lg sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-[#0E172B]">Edit Post</h1>
            <p className="text-sm text-[#0E172B]/60">Editing: {post.title}</p>
          </div>
          <Link
            href="/dashboard/posts"
            className="inline-flex items-center justify-center rounded-full border border-[#0E172B]/15 bg-white px-4 py-2 text-sm font-semibold text-[#0E172B] transition hover:border-[#FACC14]"
          >
            ← Back to posts
          </Link>
        </header>

        <form action={updatePost} className="rounded-2xl border border-[#0E172B]/10 bg-white p-6 shadow-lg">
          <input type="hidden" name="id" value={post.id} />
          <div className="grid gap-6">
            <div className="grid gap-6 md:grid-cols-2">
              <label className="flex flex-col gap-2">
                <span className="text-sm font-semibold text-[#0E172B]">Title</span>
                <input 
                  name="title" 
                  className="input bg-white" 
                  required 
                  defaultValue={post.title}
                  placeholder="5 Tips for Motorway Breakdowns" 
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-sm font-semibold text-[#0E172B]">Slug</span>
                <input 
                  name="slug" 
                  className="input bg-white font-mono text-sm" 
                  defaultValue={post.slug}
                  placeholder="auto-generated-from-title" 
                />
              </label>
            </div>

            <label className="flex flex-col gap-2">
              <span className="text-sm font-semibold text-[#0E172B]">Status</span>
              <select name="status" className="input bg-white" defaultValue={post.status}>
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-sm font-semibold text-[#0E172B]">Content</span>
              <textarea 
                name="content" 
                className="input bg-white" 
                rows={12}
                defaultValue={post.content}
                placeholder="Write your post content here..." 
              />
            </label>

            <div className="flex items-center justify-end gap-3 border-t border-[#0E172B]/10 pt-6">
              <Link
                href="/dashboard/posts"
                className="inline-flex items-center justify-center rounded-full border border-[#0E172B]/15 bg-white px-4 py-2 text-sm font-semibold text-[#0E172B] transition hover:border-[#FACC14]"
              >
                Cancel
              </Link>
              <button 
                className="inline-flex items-center justify-center rounded-full bg-[#FACC14] px-6 py-2 text-sm font-semibold text-black shadow-[0_12px_30px_rgba(250,204,20,0.45)] transition hover:bg-[#ffe05a]" 
                type="submit"
              >
                Save changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
