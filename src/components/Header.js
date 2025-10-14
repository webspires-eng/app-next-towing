"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const NAV = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Dashboard", href: "/dashboard" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // add shadow when scrolling
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setOpen(false);

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
                className={`nav-link ${pathname === l.href ? "active" : ""}`}
              >
                {l.name}
              </Link>
            ))}
            <Link href="/contact" className="btn">
              Get Help
            </Link>
          </nav>

          {/* Burger button (mobile) */}
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
              className={`mobile-link ${pathname === l.href ? "active" : ""}`}
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
