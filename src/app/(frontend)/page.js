import Hero from "@/components/Hero";

export default function Home() {
  return (
    <>
      <Hero />
      {/* Example content section */}
      <section className="container-1300" style={{ padding: "36px 0" }}>
        <h2 style={{ marginBottom: 12 }}>Popular Services</h2>
        <p style={{ color: "var(--muted)" }}>
          Towing • Mobile Tyre Fitting • Jump Start • Lockout • Fuel Delivery
        </p>
      </section>
    </>
  );
}
