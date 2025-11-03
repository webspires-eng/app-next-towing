"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

const NAV = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Services",  href: "/dashboard/services" },
  { label: "Locations", href: "/dashboard/locations" },
  { label: "Posts",     href: "/dashboard/posts" },
  { label: "Users",     href: "/dashboard/users" }
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <div className="aside-inner">
      <div className="aside-brand">Next Towing</div>
      <nav className="aside-nav">
        {NAV.map(item => {
          const active = pathname === item.href || pathname?.startsWith(item.href + "/");
          return (
            <Link key={item.href} href={item.href} className={`aside-link ${active ? "is-active" : ""}`}>
              {item.label}
            </Link>
          );
        })}
      </nav>
      
      {session && (
        <div className="aside-footer">
          <div className="aside-user">
            <div className="text-sm font-medium text-white">{session.user?.name || session.user?.email}</div>
            <div className="text-xs text-white/60">{session.user?.role || "USER"}</div>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="mt-4 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 transition-colors hover:bg-white/10"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}
