// src/components/VehicleSummary.jsx
export default function VehicleSummary({ data = {} }) {
  // ---- helpers / normalisers ----
  const get = (k, fallback = "—") =>
    data?.[k] !== undefined && data?.[k] !== null && data?.[k] !== ""
      ? data[k]
      : fallback;

  const friendlyFuel = (f) => {
    if (!f) return "—";
    const map = { "HEAVY OIL": "Diesel", PETROL: "Petrol", ELECTRIC: "Electric", HYBRID: "Hybrid" };
    return map[f.toUpperCase()] || f;
  };

  // CC -> litres (2.967 L) or show "—"
  const engineLitres = (() => {
    const cc = data.engineCc ?? data.engineCapacity;
    if (!cc || Number.isNaN(Number(cc))) return "—";
    return `${(Number(cc) / 1000).toFixed(3)} L`;
  })();

  // weight in kg with thousands separators
  const prettyWeight = (() => {
    const kg = data.weightKg ?? data.revenueWeight ?? data.massInService;
    if (!kg || Number.isNaN(Number(kg))) return "—";
    return `${Number(kg).toLocaleString()} kg`;
  })();

  const makeModel = (() => {
    // DVLA VES returns make but not model; other sources may include "model" or "longModel"
    const parts = [get("make", ""), get("model", data.longModel || "")]
      .map((s) => String(s).trim())
      .filter(Boolean);
    return parts.length ? parts.join(" ") : get("make");
  })();

  const driveType = get("driveType");        // e.g. "All Permanent"
  const transmission = get("transmission");  // e.g. "Automatic"
  const bodyType = get("bodyType");
  const colour = get("colour");
  const year = get("year") || get("yearOfManufacture");
  const taxStatus = get("taxStatus");
  const motStatus = get("motStatus") || get("motStatusCode") || "N/A";

  // Optional small car icon in the title
  return (
    <section className="vs-card">
      <div className="vs-title">
        <span className="vs-title-icon" aria-hidden>🚗</span>
        Vehicle Summary
      </div>

      <dl className="vs-grid">
        {/* Column 1 */}
        <div className="vs-col">
          <Spec label="Registration Number" value={get("registrationNumber")} />
          <Spec label="Colour" value={colour} />
          <Spec label="Weight" value={prettyWeight} />
          <Spec label="MOT Status" value={motStatus} />
        </div>

        {/* Column 2 */}
        <div className="vs-col">
          <Spec label="Make & Model" value={makeModel} multiline />
          <Spec label="Fuel Type" value={friendlyFuel(get("fuelType"))} />
          <Spec label="Engine Size" value={engineLitres} />
          <Spec label="Drive Type" value={driveType} />
        </div>

        {/* Column 3 */}
        <div className="vs-col">
          <Spec label="Body Type" value={bodyType} />
          <Spec label="Year" value={year} />
          <Spec label="Tax Status" value={taxStatus || "N/A"} />
          <Spec label="Transmission" value={transmission} />
        </div>
      </dl>
    </section>
  );
}

function Spec({ label, value, multiline = false }) {
  return (
    <div className="vs-item">
      <dt className="vs-label">{label}:</dt>
      <dd className={`vs-value ${multiline ? "vs-multiline" : ""}`}>{value}</dd>
    </div>
  );
}
