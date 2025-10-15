"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Services",  href: "/dashboard/services" },
  { label: "Locations", href: "/dashboard/locations" },
  { label: "Posts",     href: "/dashboard/posts" },
  { label: "Users",     href: "/dashboard/users" }
];

export default function AdminSidebar() {
  const pathname = usePathname();
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
    </div>
  );
}
