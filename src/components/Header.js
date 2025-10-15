"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

// Add Services + Areas. matchPrefix=true means highlight on nested routes.
const NAV = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services", matchPrefix: true },
  { name: "Areas", href: "/areas", matchPrefix: true },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Dashboard", href: "/dashboard" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setOpen(false);

  // Active helper: exact match, or prefix match for sections like /services/*
  const isActive = (href, matchPrefix) =>
    matchPrefix ? pathname.startsWith(href) : pathname === href;

  return (
    <>
      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        <div className="header-inner">
          <Link href="/" className="brand" onClick={closeMenu}>
            <span className="logo-dot" />
            Next Towing
          </Link>

          {/* Desktop nav */}
          <nav className="nav-desktop" aria-label="Main">
            {NAV.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`nav-link ${isActive(l.href, l.matchPrefix) ? "active" : ""}`}
              >
                {l.name}
              </Link>
            ))}
            <Link href="/contact" className="btn">
              Get Help
            </Link>
          </nav>

          {/* Burger (mobile) */}
          <button
            className="burger"
            aria-label="Open menu"
            aria-controls="mobile-menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        id="mobile-menu"
        className={`mobile-menu ${open ? "open" : ""}`}
        role="dialog"
        aria-modal="true"
      >
        <div className="mobile-inner">
          {NAV.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`mobile-link ${isActive(l.href, l.matchPrefix) ? "active" : ""}`}
              onClick={closeMenu}
            >
              {l.name}
            </Link>
          ))}
          <Link href="/contact" className="btn btn-block" onClick={closeMenu}>
            Get Help
          </Link>
        </div>
      </div>

      {/* Backdrop */}
      {open && <div className="backdrop" onClick={closeMenu} />}
    </>
  );
}
