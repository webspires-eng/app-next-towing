import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import bcrypt from "bcrypt";

export const runtime = "nodejs";

async function createUser(formData) {
  "use server";
  const email = String(formData.get("email") || "").trim();
  const name = String(formData.get("name") || "").trim();
  const password = String(formData.get("password") || "").trim();
  const role = String(formData.get("role") || "USER");

  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await prisma.user.create({
      data: {
        email,
        name: name || null,
        password: hashedPassword,
        role,
      },
    });
  } catch (error) {
    console.error("Failed to create user", error);
    throw error;
  }

  revalidatePath("/dashboard/users");
}

async function deleteUser(formData) {
  "use server";
  const id = String(formData.get("id") || "");
  
  if (!id) return;

  try {
    await prisma.user.delete({ where: { id } });
  } catch (error) {
    console.error("Failed to delete user", error);
  }

  revalidatePath("/dashboard/users");
}

export default async function UsersList() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return (
    <section className="container-1300 section-space">
      <div className="flex flex-col gap-6">
        <header>
          <h1 className="text-3xl font-semibold text-[#0E172B]">Users</h1>
          <p className="text-sm text-[#0E172B]/70">Manage admin users and their access levels.</p>
        </header>

        {/* Add User Form */}
        <div className="rounded-2xl border border-[#0E172B]/10 bg-white p-6 shadow-lg">
          <h2 className="mb-4 text-lg font-semibold text-[#0E172B]">Add New User</h2>
          <form action={createUser} className="grid gap-4 md:grid-cols-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-[#0E172B]">Email</label>
              <input
                name="email"
                type="email"
                required
                className="input bg-white"
                placeholder="admin@example.com"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-[#0E172B]">Name</label>
              <input
                name="name"
                type="text"
                className="input bg-white"
                placeholder="John Doe"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-[#0E172B]">Password</label>
              <input
                name="password"
                type="password"
                required
                className="input bg-white"
                placeholder="••••••••"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-[#0E172B]">Role</label>
              <select name="role" className="input bg-white" defaultValue="USER">
                <option value="USER">User</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>
            <div className="flex items-end md:col-span-4">
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-full bg-[#FACC14] px-6 py-2 text-sm font-semibold text-black shadow-[0_12px_30px_rgba(250,204,20,0.45)] transition hover:bg-[#ffe05a]"
              >
                Add User
              </button>
            </div>
          </form>
        </div>

        {/* Users List */}
        <div className="overflow-hidden rounded-2xl border border-[#0E172B]/10 bg-white shadow-lg">
          <table className="min-w-full divide-y divide-[#0E172B]/10 text-left text-sm text-[#0E172B]">
            <thead className="bg-[#FACC14]/10 text-xs font-semibold uppercase tracking-[0.2em] text-[#0E172B]">
              <tr>
                <th className="px-5 py-3">Email</th>
                <th className="px-5 py-3">Name</th>
                <th className="px-5 py-3">Role</th>
                <th className="px-5 py-3">Created</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#0E172B]/10">
              {users.length === 0 && (
                <tr>
                  <td className="px-5 py-8 text-center text-[#0E172B]/60" colSpan={5}>
                    No users yet. Create your first one above.
                  </td>
                </tr>
              )}
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-[#0E172B]/3">
                  <td className="px-5 py-4 font-semibold">{user.email}</td>
                  <td className="px-5 py-4">{user.name || "—"}</td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                        user.role === "ADMIN"
                          ? "bg-purple-100 text-purple-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-[#0E172B]/60">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-5 py-4">
                    <form action={deleteUser} className="flex justify-end">
                      <input type="hidden" name="id" value={user.id} />
                      <button
                        type="submit"
                        className="text-sm font-semibold text-red-500 hover:text-red-600"
                        aria-label={`Delete ${user.email}`}
                      >
                        Delete
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="rounded-lg border border-yellow-400/20 bg-yellow-400/10 p-4 text-sm text-[#0E172B]/80">
          <p className="font-semibold">⚠️ Security Note:</p>
          <p className="mt-1">
            Only create admin users for trusted team members. Users with ADMIN role have full access to the dashboard.
          </p>
        </div>
      </div>
    </section>
  );
}
