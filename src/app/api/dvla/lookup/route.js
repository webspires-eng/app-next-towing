import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { vrm } = await req.json();

    if (!vrm || typeof vrm !== "string") {
      return NextResponse.json({ error: "Missing vrm" }, { status: 400 });
    }

    // Normalise: remove spaces and uppercase (DVLA requirement)
    const registrationNumber = vrm.replace(/\s+/g, "").toUpperCase();

    const url =
      process.env.DVLA_API_URL ||
      "https://driver-vehicle-licensing.api.gov.uk/vehicle-enquiry/v1/vehicles";

    // Optional: allow mock mode for development without hitting DVLA
    const useMock = (process.env.DVLA_USE_MOCK || "").toLowerCase() === "1" || (process.env.DVLA_USE_MOCK || "").toLowerCase() === "true";
    if (useMock) {
      return NextResponse.json({
        registrationNumber,
        make: "FORD",
        model: "TRANSIT CUSTOM",
        colour: "WHITE",
        bodyType: "PANEL VAN",
        fuelType: "HEAVY OIL",
        year: 2021,
        taxStatus: "Taxed",
        motStatus: "Valid",
        transmission: "Automatic",
        driveType: "FWD",
        weightKg: 2600,
        engineCapacity: 1996,
      });
    }

    const apiKey = process.env.DVLA_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        {
          error: "DVLA_API_KEY not configured",
          hint: "Set DVLA_API_KEY or enable DVLA_USE_MOCK=1 for development. See .env.example.",
        },
        { status: 500 }
      );
    }

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "x-api-key": apiKey, // server-side secret
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ registrationNumber }),
    });

    // DVLA returns JSON on success; on errors it can still be JSON,
    // but we’ll capture plain text just in case.
    const text = await res.text();
    if (!res.ok) {
      // Pass through DVLA’s message so you can see “Missing VRM”, “Forbidden”, etc.
      return NextResponse.json(
        { error: "DVLA lookup failed", status: res.status, body: text },
        { status: 502 }
      );
    }

    // Parse once we know it’s OK
    const data = JSON.parse(text);
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(
      { error: "Lookup crashed", detail: String(err) },
      { status: 500 }
    );
  }
}
