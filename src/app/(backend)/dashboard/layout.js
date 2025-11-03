import AdminSidebar from "@/components/admin/AdminSidebar";
import { SessionProvider } from "@/components/SessionProvider";

export const runtime = "nodejs";

export default function DashboardLayout({ children }) {
  return (
    <SessionProvider>
      <div className="admin-shell">
        <aside className="admin-aside">
          <AdminSidebar />
        </aside>
        <main className="admin-main">
          <header className="admin-topbar"><strong>Admin Panel</strong></header>
          <div className="admin-content">{children}</div>
        </main>
      </div>
    </SessionProvider>
  );
}
