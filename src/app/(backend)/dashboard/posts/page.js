import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { revalidatePath } from "next/cache";

export const runtime = "nodejs";

async function removePost(formData) {
  "use server";
  const id = String(formData.get("id") || "");
  if (!id) return;
  try { 
    await prisma.post.delete({ where: { id } }); 
  } catch (error) {
    console.error("Failed to delete post", error);
  }
  revalidatePath("/dashboard/posts");
}

export default async function PostsList() {
  const posts = await prisma.post.findMany({ 
    orderBy: { updatedAt: "desc" },
    select: {
      id: true,
      title: true,
      slug: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    }
  });

  return (
    <section className="container-1300 section-space">
      <div className="flex flex-col gap-6">
        <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-[#0E172B]">Posts</h1>
            <p className="text-sm text-[#0E172B]/70">Manage blog posts and articles for your website.</p>
          </div>
          <Link href="/dashboard/posts/new" className="btn">
            Add post
          </Link>
        </header>

        <div className="overflow-hidden rounded-2xl border border-[#0E172B]/10 bg-white shadow-lg">
          <table className="min-w-full divide-y divide-[#0E172B]/10 text-left text-sm text-[#0E172B]">
            <thead className="bg-[#FACC14]/10 text-xs font-semibold uppercase tracking-[0.2em] text-[#0E172B]">
              <tr>
                <th className="px-5 py-3">Title</th>
                <th className="px-5 py-3">Slug</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Updated</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#0E172B]/10">
              {posts.length === 0 && (
                <tr>
                  <td className="px-5 py-8 text-center text-[#0E172B]/60" colSpan={5}>
                    No posts yet. Create your first one.
                  </td>
                </tr>
              )}
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-[#0E172B]/3">
                  <td className="px-5 py-4 font-semibold">{post.title}</td>
                  <td className="px-5 py-4 font-mono text-xs uppercase text-[#0E172B]/70">{post.slug}</td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                      post.status === 'published' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {post.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-[#0E172B]/60">
                    {new Date(post.updatedAt).toLocaleDateString()}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-3">
                      <Link
                        href={`/dashboard/posts/${post.id}/edit`}
                        className="text-sm font-semibold text-[#0E172B] hover:text-[#FACC14]"
                      >
                        Edit
                      </Link>
                      <form action={removePost} className="inline-flex">
                        <input type="hidden" name="id" value={post.id} />
                        <button
                          type="submit"
                          className="text-sm font-semibold text-red-500 hover:text-red-600"
                          aria-label={`Delete ${post.title}`}
                        >
                          Delete
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

