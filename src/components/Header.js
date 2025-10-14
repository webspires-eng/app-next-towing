"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  return (
    <header
      style={{
        backgroundColor: "#00407F",
        padding: "15px 40px",
        color: "#fff",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h2 style={{ margin: 0 }}>Next Towing</h2>

      <nav style={{ display: "flex", gap: "20px" }}>
        {[
          { name: "Home", href: "/" },
          { name: "About", href: "/about" },
          { name: "Contact", href: "/contact" },
          { name: "Dashboard", href: "/dashboard" },
        ].map((link) => (
          <Link
            key={link.href}
            href={link.href}
            style={{
              color: pathname === link.href ? "#FFBF00" : "#fff",
              textDecoration: "none",
              fontWeight: pathname === link.href ? "bold" : "normal",
            }}
          >
            {link.name}
          </Link>
        ))}
      </nav>
    </header>
  );
}
