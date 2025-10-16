const STEPS = [
  { n: 1, title: "Tell us where you are", sub: "Pin your location or share a landmark.", Icon: LocationIcon },
  { n: 2, title: "We dispatch a driver",  sub: "Live updates & ETA to your phone.",    Icon: DispatchIcon },
  { n: 3, title: "On-site fix or tow",     sub: "We try to fix first—tow if needed.",  Icon: WrenchTowIcon },
];

export default function HowItWorks() {
  return (
    <section
      style={{
        fontFamily: "'Poppins', sans-serif",
        background: "linear-gradient(180deg,#FFFFFF 0%, #F7FAFF 100%)",
        padding: "72px 0 84px",
        borderTop: "1px solid #E6ECF2",
        borderBottom: "1px solid #E6ECF2"
      }}
    >
      <div style={{ maxWidth: "1300px", margin: "0 auto", padding: "0 24px" }}>
        {/* Head */}
        <header style={{ textAlign: "center", marginBottom: 36 }}>
          <div
            style={{
              display: "inline-block",
              padding: "6px 12px",
              borderRadius: 999,
              background: "rgba(254,191,0,0.2)",
              color: "#00407F",
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: ".06em",
              textTransform: "uppercase",
              marginBottom: 12
            }}
          >
            Fast & Reliable
          </div>
          <h2 style={{ margin: "0 0 10px", fontWeight: 800, fontSize: 40, color: "#00407F" }}>
            How It Works
          </h2>
          <p style={{ margin: 0, fontSize: 18, color: "#4B5563", lineHeight: 1.6, maxWidth: 760, marginInline: "auto" }}>
            A simple three-step journey to get you moving again—day or night.
          </p>
        </header>

        {/* Card container */}
        <div
          style={{
            background: "#FFFFFF",
            border: "1px solid #E6ECF2",
            borderRadius: 24,
            boxShadow: "0 12px 40px rgba(0,64,127,0.08)",
            padding: "28px 24px 32px"
          }}
        >

          {/* ROW 1: RINGS + CONNECTORS (flex, perfectly centered) */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              marginBottom: 18
            }}
          >
            {/* Ring 1 */}
            <Ring n={1} Icon={LocationIcon} />

            {/* Connector with dashed line */}
            <Connector />

            {/* Ring 2 */}
            <Ring n={2} Icon={DispatchIcon} />

            {/* Connector with truck badge at center */}
            <Connector badge={<TruckBadge />} />

            {/* Ring 3 */}
            <Ring n={3} Icon={WrenchTowIcon} />
          </div>

          {/* ROW 2: COPY (grid) */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {STEPS.map(({ n, title, sub }) => (
              <div key={n}>
                <h3 style={{ margin: "8px 0 6px", fontWeight: 700, fontSize: 22, color: "#000" }}>
                  {title}
                </h3>
                <p style={{ margin: 0, fontSize: 16, color: "#4B5563", lineHeight: 1.65 }}>
                  {sub}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===== Subcomponents (inline-styled) ===== */

function Ring({ n, Icon }) {
  return (
    <div style={{ position: "relative", width: 72, height: 72, minWidth: 72 }}>
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "50%",
          border: "3px solid #00407F",
          color: "#00407F",
          display: "grid",
          placeItems: "center",
          fontWeight: 700,
          fontSize: 20,
          background: "#fff"
        }}
      >
        {n}
      </div>
      {/* Icon chip sits neatly on the ring; no absolute top math elsewhere */}
      <div
        style={{
          position: "absolute",
          right: -6,
          bottom: -6,
          width: 28,
          height: 28,
          borderRadius: 10,
          background: "#FFFFFF",
          border: "1px solid #E6ECF2",
          display: "grid",
          placeItems: "center",
          boxShadow: "0 6px 16px rgba(0,0,0,0.06)"
        }}
      >
        <Icon />
      </div>
    </div>
  );
}

function Connector({ badge }) {
  return (
    <div style={{ flex: 1, position: "relative", height: 2 }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          top: 0,
          backgroundImage:
            "repeating-linear-gradient(90deg, #D9E3EF 0 10px, transparent 10px 20px)"
        }}
      />
      {badge && (
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          {badge}
        </div>
      )}
    </div>
  );
}

function TruckBadge() {
  return (
    <div
      style={{
        width: 32,
        height: 32,
        borderRadius: 10,
        background: "#FEBF00",
        display: "grid",
        placeItems: "center",
        boxShadow: "0 10px 24px rgba(0,0,0,0.12)",
        border: "1px solid rgba(0,0,0,0.06)"
      }}
    >
      <TruckIcon />
    </div>
  );
}

/* ===== Icons (inline SVGs) ===== */

function LocationIcon(){
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="#00407F" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}>
      <path d="M12 21s-6-5.4-6-10a6 6 0 1 1 12 0c0 4.6-6 10-6 10z" />
      <circle cx="12" cy="11" r="2.5" />
    </svg>
  );
}
function DispatchIcon(){
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="#00407F" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}>
      <path d="M4 12h10" />
      <path d="M12 5l7 7-7 7" />
      <circle cx="5" cy="12" r="2" />
    </svg>
  );
}
function WrenchTowIcon(){
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="#00407F" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}>
      <path d="M10 6l-2 2 8 8 2-2-8-8z" />
      <circle cx="7" cy="9" r="2" />
      <path d="M17 14h2.5a2.5 2.5 0 0 1 0 5H17" />
      <circle cx="17" cy="19" r="1.5" />
    </svg>
  );
}
function TruckIcon(){
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}>
      <path d="M3 15h10v-5H3zM13 10h4l3 3v2h-7z" />
      <circle cx="6.5" cy="17.5" r="1.5" />
      <circle cx="17.5" cy="17.5" r="1.5" />
    </svg>
  );
}
