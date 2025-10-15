"use client";

import { useState } from "react";
import Link from "next/link";
import BookingModal from "@/components/BookingModal";

const SERVICES = [
  { title: "Breakdown Recovery", blurb: "Rapid roadside recovery when your car won’t go.", href: "/services", icon: "🛠️" },
  { title: "Accident Recovery",  blurb: "Safe transport after collisions, day or night.",   href: "/services", icon: "🚑" },
  { title: "Flatbed Towing",     blurb: "AWD & low-clearance friendly vehicle transport.", href: "/services", icon: "🛻" },
  { title: "Motorway Recovery",  blurb: "M60 and nearby motorways covered fast.",          href: "/services", icon: "🛣️" },
  { title: "Jump Start",         blurb: "Dead battery? We’ll get you moving.",             href: "/services", icon: "🔋" },
  { title: "Tyre Change",        blurb: "On-site spare changes & assistance.",             href: "/services", icon: "🛞" },
];

export default function ServicesGrid() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <section className="container-1300 services-pad">
        <header className="section-head">
          <div>
            <p className="section-kicker">What we do</p>
            <h2 className="section-title">Popular Services</h2>
            <p className="section-sub">
              24/7 towing and on-site assistance across Greater Manchester &amp; the M60.
              Fixed pricing, insured drivers, fast ETAs.
            </p>
          </div>
          <div className="section-cta">
            <Link className="btn btn-outline" href="/services">View all services</Link>
          </div>
        </header>

        <div className="cards-grid-xl" role="list">
          {SERVICES.map((s) => (
            <article key={s.title} role="listitem" className="card-xl">
              <span className="card-glow" aria-hidden="true" />

              <div className="card-top">
                <span className="card-icon" aria-hidden="true">{s.icon}</span>
                <span className="card-kicker">24/7 available</span>
              </div>

              <h3 className="card-title-xl">
                <Link href={s.href} className="link-inline">{s.title}</Link>
              </h3>

              <p className="card-blurb">{s.blurb}</p>

              <div className="card-cta-row">
                <Link href={s.href} className="link-inline">Learn more →</Link>
                <span className="pill pill-soft">Fast ETA</span>
              </div>

              <div className="card-bottom">
                {/* open the modal */}
                <button className="btn btn-sm" onClick={() => setOpen(true)}>
                  Get Help
                </button>
                <a className="btn btn-outline btn-sm" href="tel:+440000000000">Call Now</a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* The modal gets mounted once and toggled by state */}
      <BookingModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
