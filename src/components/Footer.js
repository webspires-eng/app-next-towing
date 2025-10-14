import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  const LINKS = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Dashboard", href: "/dashboard" },
  ];

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        {/* Brand */}
        <div className="footer-brand">
          <div className="brand-row">
            <span className="logo-dot" />
            <strong>Next Towing</strong>
          </div>
          <p className="muted">
            Reliable towing & roadside help built with Next.js.
          </p>

          <div className="socials">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">𝔽</a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">Ⓘ</a>
            <a href="https://x.com" target="_blank" rel="noreferrer" aria-label="X">𝕏</a>
            <a href="https://wa.me/" target="_blank" rel="noreferrer" aria-label="WhatsApp">🟢</a>
          </div>
        </div>

        {/* Quick links */}
        <div>
          <h4 className="foot-title">Quick Links</h4>
          <nav className="foot-links">
            {LINKS.map((l) => (
              <Link key={l.href} href={l.href} className="foot-link">
                {l.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Contact */}
        <div>
          <h4 className="foot-title">Contact</h4>
          <ul className="foot-contact">
            <li><a href="tel:+1000000000" className="foot-link">+1 (000) 000-0000</a></li>
            <li><a href="mailto:help@nexttowing.com" className="foot-link">help@nexttowing.com</a></li>
            <li><span className="muted">Manchester, UK</span></li>
          </ul>
          <Link href="/contact" className="btn btn-sm">Get Help</Link>
        </div>
      </div>

      <div className="footer-bar container-1300">
        <p>© {year} Next Towing • All rights reserved.</p>
        <p className="muted">
          Built with <Link href="/" className="link-inline">Next.js</Link>
        </p>
      </div>
    </footer>
  );
}
