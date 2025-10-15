import AdminSidebar from "@/components/admin/AdminSidebar";

export const runtime = "nodejs";

export default function DashboardLayout({ children }) {
  return (
    <div className="admin-shell">
      <aside className="admin-aside">
        <AdminSidebar />
      </aside>
      <main className="admin-main">
        <header className="admin-topbar"><strong>Admin Panel</strong></header>
        <div className="admin-content">{children}</div>
      </main>
    </div>
  );
}
